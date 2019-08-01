import React from 'react'
import {connect} from 'react-redux'
import {getUserCartThunk, removeMealFromCartThunk} from '../store/cart'

class Cart extends React.Component {
  constructor() {
    super()
    this.delete = this.delete.bind(this)
  }

  componentDidMount() {
    this.props.getUserCart(this.props.user.id)
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
                      this.delete(meal.id, meal.mealOrder.orderId)
                    }}
                  >
                    Delete
                  </button>
                </div>
              )
            })}
            <br />
            ${totalPrice}
            <button>Checkout</button>
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
      dispatch(removeMealFromCartThunk(mealId, orderId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
