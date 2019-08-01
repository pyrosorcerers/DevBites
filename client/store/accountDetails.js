import axios from 'axios'
import history from '../history'

// action type
const GET_SINGLE_USER = 'GET_SINGLE_USER'
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

// reducer
// export to store/index.js combineReducer
const singleUser = {}

export default function(state = singleUser, action) {
  switch (action.type) {
    case GET_SINGLE_USER:
      return {...state, ...action.singleUser}
    case SINGLE_USER_ORDER:
      // return {...state, ...action.order};
      return action.order
    default:
      return state
  }
}
