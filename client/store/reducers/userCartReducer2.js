import axios from 'axios'

/* ============= MEAL REDUCER ============= */

/* this reducer handles all actions regarding the meal(s)
stored in the redux store when user requests for meal(s) data */

/* ============= ACTION TYPES ============= */

const GET_CART_ORDERID = 'GET_CART_ORDERID'

/* ============= ACTION CREATORS ============= */

export const getCartOrderID = userCartID => {
  return {
    type: GET_CART_ORDERID,
    userCartID
  }
}

/* ============= THUNKS ============= */

export const getCartOrderIDThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/cart`)
      dispatch(getCartOrderID(data))
    } catch (error) {
      console.log(error)
    }
  }
}

/* ============= REDUCER ============= */

// userCartID is going to be an integer denoting the cart's orderID
const userCartID = null

export default function(state = userCartID, action) {
  switch (action.type) {
    case GET_CART_ORDERID: {
      return action.userCartID
    }
    default:
      return state
  }
}
