import React from 'react'
import {
  populateMealListThunk,
  clearMealList
} from '../store/reducers/mealListReducer'
import {
  getLoggedInUserCartThunk,
  addMealToCartThunk
} from '../store/reducers/userCartReducer'
import {getCartOrderIDThunk} from '../store/reducers/userCartReducer2'
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
    const query = this.props.match.params.query
    this.props.populateMealListThunk(false, query)
    this.props.getCartOrderIDThunk()
    this.props.getLoggedInUserCart()
  }

  componentWillUnmount() {
    this.props.clearMealList()
  }

  render() {
    const meal = this.props.mealList[Object.keys(this.props.mealList)[0]]
    const classes = this.props
    if (!meal) return <div>not yet</div>
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
    mealList: state.mealList,
    isLoggedIn: !!state.userAuth.id,
    userId: state.userAuth.id,
    userCart: state.userCart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getLoggedInUserCart: () => dispatch(getLoggedInUserCartThunk()),
    addToCart: (quantity, mealId, userId) =>
      dispatch(addMealToCartThunk(quantity, mealId, userId)),
    populateMealListThunk: (bool, query) =>
      dispatch(populateMealListThunk(bool, query)),
    clearMealList: () => dispatch(clearMealList()),
    getCartOrderIDThunk: () => dispatch(getCartOrderIDThunk())
  }
}

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(singleMeal)
)
