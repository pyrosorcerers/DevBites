import React from 'react'
import {getUserOrdersThunk} from '../store/reducers/userOrderListReducer'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Typography, List, ListItem, Divider} from '@material-ui/core'
import {ShoppingBasket} from '@material-ui/icons'

class AccountDetails extends React.Component {
  componentDidMount() {
    this.props.getUserOrders()
    const query = this.props.match.params.query
    // accountDetails/orders?id=1&id=2...
    this.props.populateMealListThunk(query)
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
                      <ShoppingBasket />
                      <h3 style={{margin: '0.5rem', marginRight: '2rem'}}>
                        Order ID: {count++}
                      </h3>
                      <div>
                        Ordered on:{' '}
                        {new Date(order.createdAt)
                          .toString()
                          .replace(/(\d\d:\d\d:\d\d).+/, '')}
                      </div>
                      <p style={{margin: '0.5rem', marginRight: '2rem'}}>
                        Total Price: $ {order.totalPrice}
                      </p>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </List>
                </div>
              )
            })}
          </div>
        ) : (
          <div>No Order History</div>
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
