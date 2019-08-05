import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {TextField, makeStyles, Button} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
}))

const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props
  const classes = useStyles()

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          {/* <label htmlFor="email">
            <small>Password</small>
          </label>
          <input name="email" type="text" /> */}
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            margin="normal"
            className={classes.textField}
          />
        </div>
        <div>
          {/* <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" /> */}
          <TextField
            label="Password"
            variant="outlined"
            name="password"
            margin="normal"
            className={classes.textField}
          />
        </div>
        <div>
          <Button variant="outlined" color="primary" type="submit">
            {displayName}
          </Button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <br />
      <Button variant="outlined" color="secondary" href="/auth/google">
        {displayName} with Google
      </Button>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
