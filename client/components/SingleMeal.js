import React from 'react'
import {getSingleMealThunk, removeSingleMeal} from '../store/singleMeal'
import {getLoggedInUserCartThunk, addMealToCartThunk} from '../store/cart'
import {connect} from 'react-redux'
import {
  Grid,
  Paper,
  Typography,
  withStyles,
  Select,
  Button,
  MenuItem
} from '@material-ui/core'
import {AddShoppingCart} from '@material-ui/icons'

const styles = theme => ({
  icon: {
    marginRight: 10
  }
})

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
      [event.target.name]: event.target.value,
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
    const classes = this.props
    return (
      <div key={meal.id}>
        <Paper className="single-Meal-whole-paper">
          <Grid container justify="center">
            <Grid>
              <h1>{meal.name}</h1>
              <img src={meal.image} alt="meal image" style={{width: 400}} />
            </Grid>
            <Grid
              item
              xs
              container
              direction="column"
              justify="center"
              className={classes.singleMealBody}
              style={{marginLeft: 150}}
            >
              <Typography gutterBottom variant="subtitle1" style={{width: 500}}>
                {meal.description}
              </Typography>
              <br />
              <Typography variant="h6">calories: {meal.calories}</Typography>
              <br />
              <Typography>Meal Price: ${meal.price}</Typography>

              {this.props.isLoggedIn ? (
                <div>
                  <Select
                    onChange={this.handleChange}
                    value={this.state.quantity}
                  >
                    {Array(5)
                      .fill(1)
                      .map((val, i) => {
                        return (
                          <MenuItem value={val + i} key={val + i}>
                            {val + i}
                          </MenuItem>
                        )
                      })}
                  </Select>

                  <Button
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
                    {' '}
                    <AddShoppingCart className="classes.icon" />
                    Add to Cart
                  </Button>
                </div>
              ) : (
                <p>Please log in to add to cart!</p>
              )}
            </Grid>
          </Grid>
        </Paper>
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

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(singleMeal)
)
