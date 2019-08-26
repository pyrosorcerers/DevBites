import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div
      style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
    >
      <h3>Welcome, {email}</h3>
      <img src="https://www.thespruceeats.com/thmb/8SzwOOJ6dGT1pcuoAw9e_e_tWtQ=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-480379752-588cb5de3df78caebc869bcf.jpg" />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
