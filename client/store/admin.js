import axios from 'axios'

const GET_ALL_USERS = 'GET_ALL_USERS'
const REMOVE_USER_BY_ADMIN = 'REMOVE_USER_BY_ADMIN'

export const getAllUsers = allUsers => {
  return {
    type: GET_ALL_USERS,
    allUsers
  }
}

export const removeUser = userId => {
  return {
    type: REMOVE_USER_BY_ADMIN,
    userId
  }
}

export const removeUserThunk = userId => {
  return async dispatch => {
    try {
      const deleteInfo = {
        userId
      }
      await axios.delete(`/api/users`, {
        data: deleteInfo
      })
      dispatch(removeUser(userId))
    } catch (error) {
      console.log(error)
    }
  }
}

export const getAllUsersThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/`)
      dispatch(getAllUsers(data))
    } catch (error) {
      console.log(error)
    }
  }
}

const allUsers = []

export default function(state = allUsers, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.allUsers
    case REMOVE_USER_BY_ADMIN: {
      const newAllUsers = state.filter(user => user.id !== action.userId)
      return newAllUsers
    }
    default:
      return state
  }
}
