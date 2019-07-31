import axios from 'axios'
import history from '../history'

// action type
const GET_SINGLE_MEAL = 'GET_SINGLE_MEAL'
const ADD_MEAL_TO_CART = 'ADD_MEAL_TO_CART'

// action creator
export const getSingleMeal = meal => {
  return {
    type: GET_SINGLE_MEAL,
    meal
  }
}

export const addMealToCart = () => {
  return {
    type: ADD_MEAL_TO_CART
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

// thunk middleware
export const addMealToCartThunk = mealId => {
  return async dispatch => {
    try {
      await axios.post(`/api/meals/${mealId}`)
      dispatch(addMealToCart())
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
    default:
      return state
  }
}
