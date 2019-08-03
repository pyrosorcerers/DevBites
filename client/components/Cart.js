import React from 'react'
import {connect} from 'react-redux'
import {
  getLoggedInUserCartThunk,
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
    this.props.getLoggedInUserCart(this.props.user.id)
  }

  handleCheckoutCart(orderId, totalPrice) {
    this.props.checkoutCart(orderId, totalPrice)
  }

  handleDeleteMeal(mealId, orderId) {
    this.props.deleteMealFromCart(mealId, orderId)
  }

  render() {
    let totalPrice = 0
    if (!this.props.cart)
      return (
        <div>
          <h2>Shopping Cart</h2>
          <div>Your DevBites Cart is empty.</div>
        </div>
      )
    return (
      <div>
        <h2>Shopping Cart</h2>
        {this.props.cart && this.props.cart.meals ? (
          <div>
            {this.props.cart.meals.map(meal => {
              const {quantity} = meal.mealOrder
              totalPrice += meal.price * quantity
              return (
                <div key={meal.id}>
                  <h2>{meal.name}</h2>
                  <p>Quantity: {quantity}</p>
                  <p>Meal Price: ${meal.price}</p>
                  <p>Total Price of Meal: ${quantity * meal.price}</p>
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
            Total Price of Cart: ${totalPrice}
            <br />
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
    getLoggedInUserCart: userId => dispatch(getLoggedInUserCartThunk(userId)),
    deleteMealFromCart: (mealId, orderId) =>
      dispatch(deleteMealFromCartThunk(mealId, orderId)),
    checkoutCart: (orderId, totalPrice) =>
      dispatch(checkoutCartThunk(orderId, totalPrice))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
