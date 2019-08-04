const router = require('express').Router()
const {User, Meal, Order, MealOrder} = require('../../db/models')
// const Orders = require('../../db/models/order')
// const mealOrder = require('../../db/models/mealOrder')
// const Meals = require('../../db/models/meal')
module.exports = router

const authorizeAdmin = (req, res, next) => {
  if (req.user.isAdmin) next()
  else {
    res.json('No')
  }
}

const authorizeCorrectUser = (req, res, next) => {
  if (req.user.id === Number(req.params.id)) next()
  else {
    res.json('No')
  }
}

router.get('/', authorizeAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/orders', async (req, res, next) => {
  try {
    const userOrders = await Order.findAll({
      include: [{model: Meal}],
      where: {
        isCart: false,
        userId: req.user.id
      },
      order: [['updatedAt', 'DESC']]
    })
    res.json(userOrders)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', authorizeCorrectUser, async (req, res, next) => {
  try {
    const singleUser = await User.findByPk(req.params.id)
    res.json(singleUser)
  } catch (err) {
    next(err)
  }
})

router.get('/:id/orders', authorizeCorrectUser, async (req, res, next) => {
  try {
    const userOrders = await Order.findAll({
      include: [{model: Meal}],
      where: {
        isCart: false,
        userId: req.params.id
      }
    })
    res.json(userOrders)
  } catch (err) {
    next(err)
  }
})
