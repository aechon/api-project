import { csrfFetch } from './csrf';

const ADD_IMAGE = '/spot/:spotId/images'

const addImage = payload => ({
    type: ADD_IMAGE,
    payload
});

export const addImageToSpot = (imageData, id) => async dispatch => {
    const { url, preview } = imageData;
    const response = await csrfFetch(`/api/spots/${id}/images`, {
        method: "POST",
        body: JSON.stringify({
          url,
          preview
        })
      });
      const image = await response.json();
      dispatch(addImage(image));
      return response;
}

const initialState = {
    image: {}
}

const imagesReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_IMAGE: 
        return { 
          ...state,
          image: action.payload
      };
      default:
        return state;
    }
  }
  
  export default imagesReducer;