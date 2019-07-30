const router = require('express').Router()
const {User, Meal, Order, MealOrder} = require('../../db/models')
// const Orders = require('../../db/models/order')
// const mealOrder = require('../../db/models/mealOrder')
// const Meals = require('../../db/models/meal')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const singleUser = await User.findByPk(req.params.id)
    res.json(singleUser)
  } catch (err) {
    next(err)
  }
})

router.get('/:id/orders', async (req, res, next) => {
  try {
    const userOrders = await Order.findAll({
      include: [{model: Meal}],
      where: {
        userId: req.params.id
      }
    })
    res.json(userOrders)
  } catch (err) {
    next(err)
  }
})
