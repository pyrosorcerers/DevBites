import axios from 'axios'
import history from '../history'

// action type
const GET_SINGLE_MEAL = 'GET_SINGLE_MEAL'
const REMOVE_SINGLE_MEAL = 'REMOVE_SINGLE_MEAL'

// action creator
export const getSingleMeal = meal => {
  return {
    type: GET_SINGLE_MEAL,
    meal
  }
}

export const removeSingleMeal = () => {
  return {
    type: REMOVE_SINGLE_MEAL
  }
}

// thunk middleware
export const getSingleMealThunk = mealId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/meals/${mealId}`)
      dispatch(getSingleMeal(data))
    } catch (error) {
      console.log(error)
    }
  }
}

// reducer
// export to store/index.js combineReducer
const singleMeal = {}

export default function(state = singleMeal, action) {
  switch (action.type) {
    case GET_SINGLE_MEAL:
      return action.meal
    case REMOVE_SINGLE_MEAL:
      return singleMeal
    default:
      return state
  }
}
