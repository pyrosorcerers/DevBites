import React from 'react'
import {getSingleMealThunk, removeSingleMeal} from '../store/singleMeal'
import {getLoggedInUserCartThunk, addMealToCartThunk} from '../store/cart'
import {connect} from 'react-redux'

class singleMeal extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: 1
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      quantity: event.target.value
    })
  }

  handleSubmit() {
    this.props.addToCart(
      this.state.quantity,
      this.props.match.params.id,
      this.props.userId
    )
  }

  componentDidMount() {
    this.props.getMeal(this.props.match.params.id)
    this.props.isLoggedIn && this.props.getLoggedInUserCart()
  }

  componentWillUnmount() {
    this.props.removeSingleMeal()
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
            <select onChange={this.handleChange}>
              {Array(5)
                .fill(1)
                .map((val, i) => {
                  return (
                    <option value={val + i} key={val + i}>
                      {val + i}
                    </option>
                  )
                })}
            </select>
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
    removeSingleMeal: () => dispatch(removeSingleMeal()),
    getMeal: mealId => dispatch(getSingleMealThunk(mealId)),
    getLoggedInUserCart: () => dispatch(getLoggedInUserCartThunk()),
    addToCart: (quantity, mealId, userId) =>
      dispatch(addMealToCartThunk(quantity, mealId, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(singleMeal)
