import { csrfFetch } from './csrf';

const LOAD_SPOTS = 'spots';
const LOAD_SPOT = 'spots/:spotId';
const LOAD_USER_SPOTS = 'spots/current';
const ADD_SPOT = 'spots';
const EDIT_SPOT = 'spots/:spotId';
const DELETE_SPOT = 'spots/:spotId;'

const loadSpots = payload => ({
  type: LOAD_SPOTS,
  payload
});

const loadSpot = payload => ({
  type: LOAD_SPOT,
  payload
});

const loadUserSpots = payload => ({
  type: LOAD_USER_SPOTS,
  payload
})

const addSpot = payload => ({
  type: ADD_SPOT,
  payload
});

const editSpot = payload => ({
  type: EDIT_SPOT,
  payload
})

const deleteSpot = payload => ({
  type: DELETE_SPOT,
  payload
})

export const getSpots = () => async dispatch => {
  const response = await fetch(`/api/spots`);

  if (response.ok) {
    const spots = await response.json();
    dispatch(loadSpots(spots));
  }
};

export const getUserSpots = () => async dispatch => {
  const response = await csrfFetch(`/api/spots/current`);

  if (response.ok) {
    const spots = await response.json();
    dispatch(loadUserSpots(spots));
  }
};

export const getSpotById = (id) => async dispatch => {
  const response = await fetch(`/api/spots/${id}`)

  if (response.ok) {
    const spot = await response.json();
    dispatch(loadSpot(spot));
  }
}

export const createSpot = (spotData) => async (dispatch) => {
  const { address, city, state, country, lat, lng, name, description, price } = spotData;
  const response = await csrfFetch("/api/spots", {
    method: "POST",
    body: JSON.stringify({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price
    })
  });
  const spot = await response.clone().json();
  dispatch(addSpot(spot));
  return response;
};

export const updateSpot = (spotData, id) => async (dispatch) => {
  const { address, city, state, country, lat, lng, name, description, price } = spotData;
  const response = await csrfFetch(`/api/spots/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price
    })
  });
  const spot = await response.json();
  dispatch(editSpot(spot));
  return response;
};

export const removeSpot = (spotId) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    dispatch(deleteSpot(spotId));
  }
};

const initialState = {
  spots: {},
  spot: {}
};

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOT: 
      return { 
        ...state,
        spot: action.payload
    };
    case LOAD_SPOTS: 
      return { 
        ...state,
        spots: action.payload
    };
    case LOAD_USER_SPOTS: 
      return { 
        ...state,
        spots: action.payload
    };
    case ADD_SPOT: 
      return { 
        ...state,
        spot: action.payload
    };
    case EDIT_SPOT: 
      return { 
        ...state,
        spot: action.payload
    };
    case DELETE_SPOT: 
      return { 
        ...state,
        spot: action.payload
    };
    default:
      return state;
  }
}

export default spotsReducer;