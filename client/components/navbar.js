import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {getLoggedInUserCartThunk} from '../store/cart'
import {Breadcrumbs, Paper, Button} from '@material-ui/core'

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
                    Home
                  </Button>
                  <Button
                    component={materialRouter}
                    to="/accountDetails"
                    style={linkStyle}
                  >
                    My Account
                  </Button>
                  <Button href="#" onClick={handleClick} style={linkStyle}>
                    Logout
                  </Button>
                  <Button
                    component={materialRouter}
                    to="/menu"
                    style={linkStyle}
                  >
                    Menu
                  </Button>
                  <Button
                    component={materialRouter}
                    to="/cart"
                    style={linkStyle}
                  >
                    Cart{' '}
                    {this.props.userCart &&
                      (this.props.userCart.meals &&
                        this.props.userCart.meals.length)}
                  </Button>
                </Breadcrumbs>
              </div>
            ) : (
              <div>
                <Breadcrumbs>
                  {/* The navbar will show these links before you log in */}
                  <Button
                    component={materialRouter}
                    to="/login"
                    style={linkStyle}
                  >
                    Login
                  </Button>
                  <Button
                    component={materialRouter}
                    to="/signup"
                    style={linkStyle}
                  >
                    Sign Up
                  </Button>
                  <Button
                    component={materialRouter}
                    to="/menu"
                    style={linkStyle}
                  >
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

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
