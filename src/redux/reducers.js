import { TOGGLE_FAVORITE } from './actions';

const initialState = {
  favorites: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const exists = state.favorites.some(movie => movie.id === action.payload.id);
      
      if (exists) {
        return {
          ...state,
          favorites: state.favorites.filter(movie => movie.id !== action.payload.id)
        };
      } else {
        return {
          ...state,
          favorites: [...state.favorites, action.payload]
        };
      }
    default:
      return state;
  }
};

export default rootReducer;