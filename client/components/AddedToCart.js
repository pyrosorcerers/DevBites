import React from 'react'
import {Link} from 'react-router-dom'
import {Button} from '@material-ui/core'

const AddedToCart = () => {
  return (
    <div>
      Your meal has been successfully added to your shopping cart.
      <br />
      <Link to="cart">
        <Button type="button">Proceed to Checkout</Button>
      </Link>
    </div>
  )
}

export default AddedToCart
