import axios from 'axios'
import history from '../history'

// action type
const GET_USER_CART = 'GET_USER_CART'
const ADD_MEAL_TO_CART = 'ADD_MEAL_TO_CART'

// action creator
export const getUserCart = cart => {
  return {
    type: GET_USER_CART,
    cart
  }
}

export const addMealToCart = () => {
  return {
    type: ADD_MEAL_TO_CART
  }
}

// thunk middleware
export const getUserCartThunk = singleUserId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/cart/${singleUserId}`)
      dispatch(getUserCart(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const addMealToCartThunk = (mealId, userId) => {
  return async dispatch => {
    try {
      const newMealOrder = {
        quantity: 1,
        mealId,
        userId
      }
      await axios.post(`/api/cart`, newMealOrder)
      dispatch(addMealToCart())
    } catch (error) {
      console.log(error)
    }
  }
}

// reducer
// export to store/index.js combineReducer
const userCart = {}

export default function(state = userCart, action) {
  switch (action.type) {
    case GET_USER_CART:
      return action.cart
    default:
      return state
  }
}
