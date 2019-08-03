import React from 'react'
import {connect} from 'react-redux'
import {
  getLoggedInUserCartThunk,
  deleteMealFromCartThunk,
  checkoutCartThunk
} from '../store/cart'
import {Link} from 'react-router-dom'

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
          <Link to="menu">
            <button type="button">Go to Menus</button>
          </Link>
        </div>
      )
    return (
      <div>
        <h2>Shopping Cart</h2>
        {this.props.cart && this.props.cart.meals ? (
          this.props.cart.meals.length === 0 ? (
            <div>
              <div>Your DevBites Cart is empty.</div>
              <Link to="menu">
                <button type="button">Go to Menus</button>
              </Link>
            </div>
          ) : (
            <div>
              {this.props.cart.meals.map(meal => {
                const {quantity} = meal.mealOrder
                totalPrice += meal.price * quantity
                return (
                  <div
                    key={meal.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        this.handleDeleteMeal(meal.id, this.props.cart.id)
                      }}
                      style={{marginTop: '.3rem'}}
                    >
                      Delete
                    </button>
                    <h4 style={{margin: '0.5rem', marginRight: '2rem'}}>
                      {meal.name}
                    </h4>
                    <p style={{margin: '0.5rem', marginRight: '2rem'}}>
                      Quantity: {quantity}
                    </p>
                    <p style={{margin: '0.5rem', marginRight: '2rem'}}>
                      Meal Price: ${meal.price}
                    </p>
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
          )
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
