import React from 'react'
import {getUserOrdersThunk} from '../store/accountDetails'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Typography, List, ListItem} from '@material-ui/core'
import {Restaurant} from '@material-ui/icons'

class AccountDetails extends React.Component {
  componentDidMount() {
    this.props.getUserOrders()
  }
  render() {
    let count = 1
    return (
      <div>
        <Typography variant="h3">Order History</Typography>
        {this.props.orders.length ? (
          <div>
            <div style={{margin: '0.5rem', marginBottom: '1rem'}}>
              Ordered by the time order was submitted.
            </div>
            {this.props.orders.map(order => {
              return (
                <div
                  key={order.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <List>
                    <ListItem>
                      <Restaurant />
                      <h3 style={{margin: '0.5rem', marginRight: '2rem'}}>
                        Order ID: {count++}
                      </h3>
                      <div>
                        Ordered on: {new Date(order.createdAt).toString()}
                      </div>
                      <p style={{margin: '0.5rem', marginRight: '2rem'}}>
                        Total Price: $ {order.totalPrice}
                      </p>
                    </ListItem>
                  </List>
                </div>
              )
            })}
          </div>
        ) : (
          <div> Loading....</div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUserOrders: () => dispatch(getUserOrdersThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountDetails)
