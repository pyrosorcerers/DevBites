import axios from 'axios'
import history from '../history'

// action type
const GET_USER_CART = 'GET_USER_CART'
const ADD_MEAL_TO_CART = 'ADD_MEAL_TO_CART'
const REMOVE_MEAL_FROM_CART = 'REMOVE_MEAL_FROM_CART'

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

export const removeMealFromCart = mealId => {
  return {
    type: REMOVE_MEAL_FROM_CART,
    mealId
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

export const addMealToCartThunk = (quantity, mealId, userId) => {
  return async dispatch => {
    try {
      const newMealOrder = {
        quantity,
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

export const removeMealFromCartThunk = (mealId, orderId) => {
  return async dispatch => {
    try {
      const deleteInfo = {
        mealId,
        orderId
      }
      await axios.delete(`/api/cart`, {
        data: deleteInfo
      })
      dispatch(removeMealFromCart(mealId))
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
    case REMOVE_MEAL_FROM_CART:
      const newmeals = state.meals.filter(meal => meal.id !== action.mealId)
      return {...state, meals: newmeals}
    default:
      return state
  }
}
