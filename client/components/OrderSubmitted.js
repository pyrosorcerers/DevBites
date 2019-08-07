import React from 'react'
import {Link} from 'react-router-dom'
import {Button} from '@material-ui/core'

const OrderSubmitted = () => {
  return (
    <div>
      <h2>Order Submitted!</h2>
      <p>Thank you for shopping with DevBites.</p>
      <Link to="menu">
        <Button type="button">Continue Shopping</Button>
      </Link>
    </div>
  )
}

export default OrderSubmitted
