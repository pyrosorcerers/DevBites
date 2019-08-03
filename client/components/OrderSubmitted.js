import React from 'react'
import {Link} from 'react-router-dom'

const OrderSubmitted = () => {
  return (
    <div>
      <h2>Order Submitted!</h2>
      <p>Thank you for shopping with DevBites.</p>
      <Link to="menu">
        <button type="button">Continue Shopping</button>
      </Link>
    </div>
  )
}

export default OrderSubmitted
