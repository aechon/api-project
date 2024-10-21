import { csrfFetch } from './csrf';

const LOAD_SPOT_REVIEWS = 'spots/:spotId/reviews';
const LOAD_USER_REVIEWS = 'reviews/current';
const ADD_REVIEW = 'spots/:spotId/reviews';
const DELETE_REVIEW = 'reviews/:reviewId';

const loadSpotReviews = payload => ({
  type: LOAD_SPOT_REVIEWS,
  payload
});

const loadUserReviews = payload => ({
  type: LOAD_USER_REVIEWS,
  payload
});

const addReview = payload => ({
  type: ADD_REVIEW,
  payload
})

const deleteReview = payload => ({
  type: DELETE_REVIEW,
  payload
})

export const getSpotReviews = (id) => async dispatch => {
  const response = await fetch(`/api/spots/${id}/reviews`);

  if (response.ok) {
    const reviews = await response.json();
    dispatch(loadSpotReviews(reviews));
  }
};

export const getUserReviews = () => async dispatch => {
  const response = await fetch(`/api/reviews/current`)

  if (response.ok) {
    const reviews = await response.json();
    dispatch(loadUserReviews(reviews));
  }
}

export const postReview = (reviewData, id) => async dispatch => {
  const { review, stars } = reviewData;
  const response = await csrfFetch(`/api/spots/${id}/reviews`, {
    method: "POST",
    body: JSON.stringify({
      review,
      stars
    })
  });
  const newReview = await response.json();
  dispatch(addReview(newReview));
  return response;
};

export const removeReview = (reviewId) => async dispatch => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    dispatch(deleteReview(reviewId));
  }
};

const initialState = {
  reviews: []
};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER_REVIEWS: 
      return { 
        ...state,
        reviews: action.payload
    };
    case LOAD_SPOT_REVIEWS: 
      return { 
        ...state,
        reviews: action.payload
    };
    case ADD_REVIEW: 
      return { 
        ...state,
        reviews: action.payload
    };
    case DELETE_REVIEW: 
      return { 
        ...state,
        spot: action.payload
    };
    default:
      return state;
  }
}

export default reviewsReducer;