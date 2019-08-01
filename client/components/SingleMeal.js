import React from 'react'
import {getSingleMealThunk} from '../store/singleMeal'
import {addMealToCartThunk} from '../store/cart'
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
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
            <button type="submit" onClick={this.handleSubmit}>
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
    userId: state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getMeal: mealId => dispatch(getSingleMealThunk(mealId)),
    addToCart: (quantity, mealId, userId) =>
      dispatch(addMealToCartThunk(quantity, mealId, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(singleMeal)
