import axios from 'axios'
import history from '../history'

// action type
const GET_SINGLE_USER = 'GET_SINGLE_USER'

// action creator
export const getSingleUser = singleUser => {
  return {
    type: GET_SINGLE_USER,
    singleUser
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

// reducer
// export to store/index.js combineReducer
const singleUser = {}

export default function(state = singleUser, action) {
  switch (action.type) {
    case GET_SINGLE_USER:
      return action.singleUser
    default:
      return state
  }
}
