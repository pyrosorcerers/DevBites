import React from 'react'
import {getAllUsersThunk, removeUserThunk} from '../store/admin'
import {connect} from 'react-redux'

class AdminAccount extends React.Component {
  constructor() {
    super()
    this.handleRemove = this.handleRemove.bind(this)
  }

  componentDidMount() {
    this.props.getAllUsers()
  }

  handleRemove(userId) {
    this.props.removeUser(userId)
  }

  render() {
    return (
      <div>
        <h1>All Users</h1>
        {this.props.allUsers &&
          this.props.allUsers.map(user => (
            <div key={user.id}>
              <div>
                <p>
                  Name: {user.firstName} {user.lastName}
                </p>
                <p>Email: {user.email}</p>
                {!user.isAdmin ? (
                  <button
                    type="button"
                    onClick={() => this.handleRemove(user.id)}
                  >
                    Delete User
                  </button>
                ) : (
                  <h3>Admin</h3>
                )}
              </div>
            </div>
          ))}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    allUsers: state.allUsers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllUsers: () => dispatch(getAllUsersThunk()),
    removeUser: userId => dispatch(removeUserThunk(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminAccount)
