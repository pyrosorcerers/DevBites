import React from 'react'
import {getMealsThunk} from '../store/meals'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Menu extends React.Component {
  componentDidMount() {
    this.props.getMeals()
  }
  render() {
    return (
      <div>
        {this.props.menu.map(meal => {
          return (
            <div key={meal.id}>
              <Link to={`/menu/${meal.id}`}>
                <h1>{meal.name}</h1>
                <img src={meal.image} alt="meal image" />
                <p>$ {meal.price}</p>
              </Link>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    menu: state.meals
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getMeals: () => dispatch(getMealsThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
