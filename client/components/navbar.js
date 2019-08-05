import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {getLoggedInUserCartThunk} from '../store/cart'
import {Breadcrumbs, Button, withStyles} from '@material-ui/core'
import {
  Home,
  ShoppingCart,
  Person,
  RestaurantMenu,
  PersonAdd,
  ArrowBack
} from '@material-ui/icons'

const styles = theme => ({
  icon: {
    marginRight: 10
  }
})

class Navbar extends React.Component {
  componentDidMount() {
    this.props.getLoggedInUserCart()
  }

  render() {
    const {handleClick, isLoggedIn, classes} = this.props
    const linkStyle = {textDecoration: 'none', color: 'black'}
    const materialRouter = React.forwardRef((props, ref) => (
      <Link innerRef={ref} {...props} />
    ))
    return (
      <div>
        <div className="title-header">
          <h1>DEV BITES</h1>
          <nav className="nav-bar">
            {isLoggedIn ? (
              <div className="nav-div">
                <Breadcrumbs>
                  {/* The navbar will show these links after you log in */}
                  <Button
                    component={materialRouter}
                    style={linkStyle}
                    to="/home"
                  >
                    {' '}
                    <Home className={classes.icon} />
                    Home
                  </Button>
                  <Button
                    component={materialRouter}
                    to="/accountDetails"
                    style={linkStyle}
                  >
                    {' '}
                    <Person className={classes.icon} />
                    My Account
                  </Button>
                  <Button href="#" onClick={handleClick} style={linkStyle}>
                    {' '}
                    <ArrowBack className={classes.icon} />
                    Logout
                  </Button>
                  <Button
                    component={materialRouter}
                    to="/menu"
                    style={linkStyle}
                  >
                    {' '}
                    <RestaurantMenu className={classes.icon} />
                    Menu
                  </Button>
                  <Button
                    component={materialRouter}
                    to="/cart"
                    style={linkStyle}
                  >
                    {' '}
                    <ShoppingCart className={classes.icon} />
                    Cart{' '}
                    {this.props.userCart &&
                      (this.props.userCart.meals &&
                        this.props.userCart.meals.length)}
                  </Button>
                </Breadcrumbs>
              </div>
            ) : (
              <div className="nav-div">
                <Breadcrumbs>
                  {/* The navbar will show these links before you log in */}
                  <Button
                    component={materialRouter}
                    to="/login"
                    style={linkStyle}
                  >
                    {' '}
                    <Person className={classes.icon} />
                    Login
                  </Button>
                  <Button
                    component={materialRouter}
                    to="/signup"
                    style={linkStyle}
                  >
                    {' '}
                    <PersonAdd className={classes.icon} />
                    Sign Up
                  </Button>
                  <Button
                    component={materialRouter}
                    to="/menu"
                    style={linkStyle}
                  >
                    {' '}
                    <RestaurantMenu className={classes.icon} />
                    Menu
                  </Button>
                </Breadcrumbs>
              </div>
            )}
          </nav>
        </div>
        <hr />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.id,
    userId: state.user.id,
    userCart: state.userCart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    getLoggedInUserCart: () => dispatch(getLoggedInUserCartThunk())
  }
}

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Navbar)
)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
