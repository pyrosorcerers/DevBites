import React from 'react'
import {getSingleMealThunk} from '../store/singleMeal'
import {addMealToCartThunk} from '../store/cart'
import {connect} from 'react-redux'

class singleMeal extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit() {
    this.props.addToCart(this.props.match.params.id, this.props.userId)
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
          <button type="submit" onClick={this.handleSubmit}>
            Add to Cart
          </button>
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
    addToCart: (mealId, userId) => dispatch(addMealToCartThunk(mealId, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(singleMeal)
