import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import mealList from './reducers/mealListReducer'
import mealCount from './reducers/mealCountReducer'
import userAuth from './reducers/userAuthReducer'
import userCartID from './reducers/userCartReducer2'
import userOrderList from './reducers/userOrderListReducer'
import userCart from './reducers/userCartReducer'

const reducer = combineReducers({
  mealList,
  mealCount,
  userAuth,
  userOrderList,
  userCart,
  userCartID
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './reducers/userAuthReducer'
