import React from 'react'
import {Link} from 'react-router-dom'

const AddedToCart = () => {
  return (
    <div>
      Your meal has been successfully added to your shopping cart.
      <br />
      <Link to="cart">
        <button type="button">Proceed to Checkout</button>
      </Link>
    </div>
  )
}

export default AddedToCart
