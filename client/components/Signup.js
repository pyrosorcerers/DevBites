import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {signup} from '../store'

const SignUpForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label>
            <small>Email</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <label>
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <label>
            <small>First Name</small>
          </label>
          <input name="firstName" type="firstName" />
        </div>
        <div>
          <label>
            <small>Last Name</small>
          </label>
          <input name="lastName" type="lastName" />
        </div>
        <div>
          <label>
            <small>Address</small>
          </label>
          <input name="address" type="address" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a href="/auth/google">{displayName} with Google</a>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      console.dir(evt.target)
      const email = evt.target.email.value
      const password = evt.target.password.value
      const firstName = evt.target.firstName.value
      const lastName = evt.target.lastName.value
      const address = evt.target.address.value
      const newUser = {email, password, firstName, lastName, address}
      dispatch(signup(newUser))
    }
  }
}

export const Signup = connect(mapStateToProps, mapDispatchToProps)(SignUpForm)

/**
 * PROP TYPES
 */
SignUpForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
