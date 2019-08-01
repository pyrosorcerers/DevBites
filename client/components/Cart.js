import React from 'react'
import {connect} from 'react-redux'
import {
  getUserCartThunk,
  removeMealFromCartThunk,
  checkoutCartThunk
} from '../store/cart'

class Cart extends React.Component {
  constructor() {
    super()
    this.delete = this.delete.bind(this)
    this.checkout = this.checkout.bind(this)
  }

  componentDidMount() {
    this.props.getUserCart(this.props.user.id)
  }

  checkout(orderId, totalPrice) {
    this.props.checkoutCart(orderId, totalPrice)
  }

  delete(mealId, orderId) {
    this.props.deleteMeal(mealId, orderId)
  }
  render() {
    let totalPrice = 0
    return (
      <div>
        <h2>List of Meals</h2>
        {this.props.cart.meals ? (
          <div>
            {this.props.cart.meals.map(meal => {
              totalPrice += meal.price * meal.mealOrder.quantity
              return (
                <div key={meal.id}>
                  <h2>
                    {meal.name} ${meal.price}
                  </h2>
                  <p>
                    {meal.mealOrder.quantity} ${meal.mealOrder.quantity *
                      meal.price}
                  </p>
                  <button
                    onClick={() => {
                      this.delete(meal.id, this.props.cart.id)
                    }}
                  >
                    Delete
                  </button>
                </div>
              )
            })}
            <br />
            ${totalPrice}
            <button
              onClick={() => {
                this.checkout(this.props.cart.id, totalPrice)
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
    deleteMeal: (mealId, orderId) =>
      dispatch(removeMealFromCartThunk(mealId, orderId)),
    checkoutCart: (orderId, totalPrice) =>
      dispatch(checkoutCartThunk(orderId, totalPrice))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
