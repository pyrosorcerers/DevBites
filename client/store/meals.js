import axios from 'axios'
import history from '../history'

// action type
const GET_MEALS = 'GET_MEALS'

// action creator
export const getMeals = meals => {
  return {
    type: GET_MEALS,
    meals
  }
}

// thunk middleware
export const getMealsThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/meals/')
      dispatch(getMeals(data))
    } catch (error) {
      console.log(error)
    }
  }
}

// reducer
// export to store/index.js combineReducer
const meals = []

export default function(state = meals, action) {
  switch (action.type) {
    case GET_MEALS:
      return action.meals
    default:
      return state
  }
}
