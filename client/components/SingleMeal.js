import React from 'react'
import {getSingleMealThunk} from '../store/singleMeal'
import {getLoggedInUserCartThunk, addMealToCartThunk} from '../store/cart'
import {connect} from 'react-redux'
import {Select, MenuItem} from '@material-ui/core'

class singleMeal extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: 1
      // disabledButton: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      quantity: event.target.value
    })
  }

  handleSubmit() {
    // this.setState({
    //   disabledButton: true
    // })
    this.props.addToCart(
      this.state.quantity,
      this.props.match.params.id,
      this.props.userId
    )
  }

  componentDidMount() {
    this.props.getMeal(this.props.match.params.id)
    this.props.getLoggedInUserCart()
  }

  render() {
    const meal = this.props.singleMeal
    return (
      <div key={meal.id}>
        <h1>{meal.name}</h1>
        <img src={meal.image} alt="meal image" />
        <p>{meal.description}</p>
        <br />
        <span>calories: {meal.calories}</span>
        <br />
        <span>${meal.price}</span>
        {this.props.isLoggedIn ? (
          <div>
            <Select name="" onChange={this.handleChange}>
              {/* <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option> */}
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
            <button
              type="submit"
              onClick={this.handleSubmit}
              disabled={
                this.props.userCart &&
                (this.props.userCart.meals &&
                  this.props.userCart.meals.some(
                    cartItem => cartItem.id === meal.id
                  ))
              }
            >
              Add to Cart
            </button>
          </div>
        ) : (
          <p>Please log in to add to cart!</p>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    singleMeal: state.singleMeal,
    isLoggedIn: !!state.user.id,
    userId: state.user.id,
    userCart: state.userCart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getMeal: mealId => dispatch(getSingleMealThunk(mealId)),
    getLoggedInUserCart: () => dispatch(getLoggedInUserCartThunk()),
    addToCart: (quantity, mealId, userId) =>
      dispatch(addMealToCartThunk(quantity, mealId, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(singleMeal)
