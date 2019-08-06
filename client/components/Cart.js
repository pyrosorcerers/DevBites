import React from 'react'
import {connect} from 'react-redux'
import {
  getLoggedInUserCartThunk,
  deleteMealFromCartThunk,
  checkoutCartThunk
} from '../store/cart'
import {Link} from 'react-router-dom'
import {DeleteForever} from '@material-ui/icons'
import {
  Fab,
  Divider,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar
} from '@material-ui/core'

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
    const classes = this.props
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
                <Button type="button" variant="contained" color="primary">
                  Go to Menus
                </Button>
              </Link>
            </div>
          ) : (
            <div>
              <List>
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
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <Fab
                              onClick={() => {
                                this.handleDeleteMeal(
                                  meal.id,
                                  this.props.cart.id
                                )
                              }}
                            >
                              {' '}
                              <DeleteForever />{' '}
                            </Fab>
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={meal.name}
                          secondary={`Quantity in Cart: ${quantity}  /  Meal Price: $ ${
                            meal.price
                          }`}
                        />
                        {/* <h4 style={{ margin: '0.5rem', marginRight: '2rem' }}>
                            {meal.name}
                          </h4>
                          <br />
                          <p style={{ margin: '0.5rem', marginRight: '2rem' }}>
                            Quantity: {quantity}
                          </p>
                          <p style={{ margin: '0.5rem', marginRight: '2rem' }}>
                            Meal Price: ${meal.price}
                          </p> */}
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </div>
                  )
                })}
              </List>
              <br />
              Total Price of Cart: ${totalPrice}
              <br />
              <Button
                type="button"
                onClick={() => {
                  this.handleCheckoutCart(this.props.cart.id, totalPrice)
                }}
                color="primary"
                variant="contained"
              >
                Checkout
              </Button>
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
