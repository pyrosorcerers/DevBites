import axios from 'axios'

// action type
const GET_SINGLE_USER = 'GET_SINGLE_USER'
const GET_USER_ORDERS = 'GET_USER_ORDERS'
const SINGLE_USER_ORDER = 'SINGLE_USER_ORDER'

// action creator
export const getSingleUser = singleUser => {
  return {
    type: GET_SINGLE_USER,
    singleUser
  }
}

export const getSingleUserOrder = order => {
  return {
    type: SINGLE_USER_ORDER,
    order
  }
}

export const getUserOrders = orders => {
  return {
    type: GET_USER_ORDERS,
    orders
  }
}

// thunk middleware
export const getSingleUserThunk = singleUserId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/${singleUserId}`)
      dispatch(getSingleUser(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const getSingleUserOrderThunk = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/cart/${userId}`)
      dispatch(getSingleUserOrder(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const getUserOrdersThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/orders`)
      dispatch(getUserOrders(data))
    } catch (error) {
      console.log(error)
    }
  }
}

// reducer
// export to store/index.js combineReducer
const orders = []

export default function(state = orders, action) {
  switch (action.type) {
    // case GET_SINGLE_USER:
    //   return {...state, ...action.singleUser}
    case GET_USER_ORDERS:
      return action.orders
    // case SINGLE_USER_ORDER:
    // return {...state, ...action.order};
    //   return action.order
    default:
      return state
  }
}
