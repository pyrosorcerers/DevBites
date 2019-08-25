import axios from 'axios'
import {normalize, schema} from 'normalizr'

/* ============= MEAL REDUCER ============= */

/* this reducer handles all actions regarding the meal(s)
stored in the redux store when user requests for meal(s) data */

/* ============= ACTION TYPES ============= */

const POPULATE_ORDER_LIST = 'POPULATE_ORDER_LIST'
const CLEAR_ORDER_LIST = 'CLEAR_ORDER_LIST'

/* ============= ACTION CREATORS ============= */

export const populateOrderList = orderList => {
  return {
    type: POPULATE_ORDER_LIST,
    orderList
  }
}

export const clearOrderList = () => {
  return {
    type: CLEAR_ORDER_LIST
  }
}

/* ============= THUNKS ============= */

export const populateOrderListThunk = orderQuery => {
  return async dispatch => {
    try {
      // populate my meals List with these meal(s)
      // example = [1,5,6] => "1,5,6"
      // if the array came as an actual array
      // mealQuery = mealsIdArray.map(mealId => `id=${mealId}`).join('&')
      // example URI: devbites.com/api/meals?id=1&id=2&id=3
      const {data} = await axios.get(`/api/orders?${orderQuery}`)
      dispatch(populateOrderList(data))
    } catch (error) {
      console.log(error)
    }
  }
}

/* ============= REDUCER ============= */

// orderList is an object. a flattened version of the retrieved DB array.
const initialOrderList = {}

// create schema for orderList on store
const orderSchema = new schema.Entity('orderList')
const orderListSchema = [orderSchema]

// how to normalize so that i have a "cart" key for my cart?

export default function(state = initialOrderList, action) {
  switch (action.type) {
    case POPULATE_ORDER_LIST: {
      // flatten the array and return object with key-value pairs for the orders by ID
      const {entities} = normalize(action.orderList, orderListSchema)
      return entities.orderList
    }
    case CLEAR_ORDER_LIST:
      return initialOrderList
    default:
      return state
  }
}
