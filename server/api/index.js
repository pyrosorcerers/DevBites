const router = require('express').Router()
module.exports = router

router.use('/users', require('./routes/users'))
router.use('/meals', require('./routes/meals'))
router.use('/cart', require('./routes/cart'))
router.use('/orders', require('./routes/orders'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
