import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {getLoggedInUserCartThunk} from '../store/cart'

class Navbar extends React.Component {
  componentDidMount() {
    this.props.isLoggedIn && this.props.getLoggedInUserCart()
  }
  render() {
    const {handleClick, isLoggedIn} = this.props
    return (
      <div>
        <h1 className="title-header">DEV BITES</h1>
        <nav className="nav-bar">
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/home">Home</Link>
              <Link to="/accountDetails">My Account</Link>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
              <Link to="/menu">Menu</Link>
              <Link to="/cart">
                Cart{' '}
                {this.props.userCart &&
                  (this.props.userCart.meals &&
                    this.props.userCart.meals.length)}
              </Link>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
              <Link to="/menu">Menu</Link>
            </div>
          )}
        </nav>
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
