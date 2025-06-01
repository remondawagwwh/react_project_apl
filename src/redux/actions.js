
export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';


export const toggleFavorite = (movie) => ({
  type: TOGGLE_FAVORITE,
  payload: movie
});