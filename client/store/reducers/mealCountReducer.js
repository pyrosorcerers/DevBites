import axios from 'axios'

/* ============= MEAL REDUCER ============= */

/* this reducer handles all actions regarding the meal(s)
stored in the redux store when user requests for meal(s) data */

/* ============= ACTION TYPES ============= */

const COUNT_MEAL_LIST = 'COUNT_MEAL_LIST'

/* ============= ACTION CREATORS ============= */

export const countMealList = mealCount => {
  return {
    type: COUNT_MEAL_LIST,
    mealCount
  }
}

/* ============= THUNKS ============= */

export const countMealListThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/meals/count`)
      dispatch(countMealList(data))
    } catch (error) {
      console.log(error)
    }
  }
}

/* ============= REDUCER ============= */

// mealList is an object. a flattened version of the retrieved DB array.
const mealCount = null

export default function(state = mealCount, action) {
  switch (action.type) {
    case COUNT_MEAL_LIST: {
      return action.mealCount
    }
    default:
      return state
  }
}
