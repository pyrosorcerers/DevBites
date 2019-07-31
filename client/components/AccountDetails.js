import React from 'react'
import {getSingleUserThunk} from '../store/singleMeal'
import {connect} from 'react-redux'

class AccountDetails extends React.Component {
  componentDidMount() {
    this.props.getSingleUser(this.props.match.params.id)
  }
  render() {
    return <div />
  }
}

const mapStateToProps = state => {
  return {
    singleUser: state.singleUser,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSingleUser: userId => dispatch(getSingleUserThunk(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountDetails)
