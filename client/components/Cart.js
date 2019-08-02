import React from 'react'
import {connect} from 'react-redux'
import {
  getUserCartThunk,
  deleteMealFromCartThunk,
  checkoutCartThunk
} from '../store/cart'

class Cart extends React.Component {
  constructor() {
    super()
    this.handleDeleteMeal = this.handleDeleteMeal.bind(this)
    this.handleCheckoutCart = this.handleCheckoutCart.bind(this)
  }

  componentDidMount() {
    console.log(this.props.user.id)
    this.props.getUserCart(this.props.user.id)
  }

  handleCheckoutCart(orderId, totalPrice) {
    this.props.checkoutCart(orderId, totalPrice)
  }

  handleDeleteMeal(mealId, orderId) {
    this.props.deleteMeal(mealId, orderId)
  }
  render() {
    let totalPrice = 0
    const mealOrders = []
    return (
      <div>
        <h2>List of Meals</h2>
        {this.props.cart.meals ? (
          <div>
            {this.props.cart.meals.map(meal => {
              mealOrders.push({
                quantity: meal.mealOrder.quantity,
                orderId: this.props.cart.id,
                mealId: meal.id,
                cumulativePrice: meal.mealOrder.quantity * meal.price
              })
              const {quantity} = meal.mealOrder
              totalPrice += meal.price * quantity
              return (
                <div key={meal.id}>
                  <h2>{meal.name}</h2>
                  <p>Quantity: {quantity}</p>
                  <p>Meal Price: ${meal.price}</p>
                  <p>Total Price: ${quantity * meal.price}</p>
                  <button
                    type="button"
                    onClick={() => {
                      this.handleDeleteMeal(meal.id, this.props.cart.id)
                    }}
                  >
                    Delete
                  </button>
                </div>
              )
            })}
            <br />
            {mealOrders.map(order => (
              <div key={order.mealId}>
                MealId: {order.mealId}, OrderId{order.orderId}, Quantity:{' '}
                {order.quantity}, MealOrder Price: {order.cumulativePrice}
              </div>
            ))}
            ${totalPrice}
            <button
              type="button"
              onClick={() => {
                this.handleCheckoutCart(this.props.cart.id, totalPrice)
              }}
            >
              Checkout
            </button>
          </div>
        ) : (
          <div> Loading....</div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.userCart,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUserCart: userId => dispatch(getUserCartThunk(userId)),
    deleteMealFromCart: (mealId, orderId) =>
      dispatch(deleteMealFromCartThunk(mealId, orderId)),
    checkoutCart: (orderId, totalPrice) =>
      dispatch(checkoutCartThunk(orderId, totalPrice))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
