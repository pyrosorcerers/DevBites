import React from 'react'
import {getSingleMealThunk} from '../store/singleMeal'
import {connect} from 'react-redux'

class singleMeal extends React.Component {
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
          <button type="submit">Add to Cart</button>
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
    isLoggedIn: !!state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getMeal: mealId => dispatch(getSingleMealThunk(mealId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(singleMeal)
