import axios from 'axios'
import {normalize, schema} from 'normalizr'

/* ============= MEAL REDUCER ============= */

/* this reducer handles all actions regarding the meal(s)
stored in the redux store when user requests for meal(s) data */

/* ============= ACTION TYPES ============= */

const POPULATE_MEAL_LIST = 'POPULATE_MEAL_LIST'
const CLEAR_MEAL_LIST = 'CLEAR_MEAL_LIST'

/* ============= ACTION CREATORS ============= */

export const populateMealList = mealList => {
  return {
    type: POPULATE_MEAL_LIST,
    mealList
  }
}

export const clearMealList = () => {
  return {
    type: CLEAR_MEAL_LIST
  }
}

/* ============= THUNKS ============= */

export const populateMealListThunk = mealQuery => {
  return async dispatch => {
    try {
      // if (isPagination) {
      // populate my meals List with a range of these meals
      // example = [10, 10] => "limit=10&offset=10"
      // mealQuery = mealsIdArray
      // } else {
      // mealQuery = mealsIdArray
      // populate my meals List with these meal(s)
      // example = [1,5,6] => "1,5,6"
      // if the array came as an actual array
      // mealQuery = mealsIdArray.map(mealId => `id=${mealId}`).join('&')
      // }
      // example URI: devbites.com/api/meals=1,2,3,5,6
      const {data} = await axios.get(`/api/meals?${mealQuery}`)
      dispatch(populateMealList(data))
    } catch (error) {
      console.log(error)
    }
  }
}

/* ============= REDUCER ============= */

// mealList is an object. a flattened version of the retrieved DB array.
const initialMealList = {}

// create schema for mealList on store
const mealSchema = new schema.Entity('mealList')
const mealListSchema = [mealSchema]

export default function(state = initialMealList, action) {
  switch (action.type) {
    case POPULATE_MEAL_LIST: {
      // flatten the array and return object with key-value pairs for the meals by ID
      const {entities} = normalize(action.mealList, mealListSchema)
      return entities.mealList
    }
    case CLEAR_MEAL_LIST:
      return initialMealList
    default:
      return state
  }
}
