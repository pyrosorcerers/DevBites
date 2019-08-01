import React from 'react'
import {connect} from 'react-redux'
import {getUserCartThunk} from '../store/cart'

class Cart extends React.Component {
  componentDidMount() {
    this.props.getUserCart(this.props.user.id)
  }

  render() {
    console.log(this.props.cart)
    return (
      <div>
        <h2>List of Meals</h2>
        {this.props.cart.meals ? (
          this.props.cart.meals.map(meal => {
            return (
              <div key={meal.id}>
                <h2>{meal.name}</h2>
              </div>
            )
          })
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
    getUserCart: userId => dispatch(getUserCartThunk(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
