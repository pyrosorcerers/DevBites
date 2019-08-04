const router = require('express').Router()
const {Meal, Order, MealOrder} = require('../../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const userCart = await Order.findOne({
      include: [{model: Meal}],
      where: {
        userId: req.user.id,
        isCart: true
      }
    })
    res.json(userCart)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const userCart = await Order.findOne({
      include: [{model: Meal}],
      where: {
        userId: req.params.userId,
        isCart: true
      }
    })
    res.json(userCart)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const userCart = await Order.findOrCreate({
      where: {
        userId: req.body.userId,
        isCart: true
      }
    })
    const newMealOrder = {
      quantity: req.body.quantity,
      mealId: req.body.mealId,
      orderId: userCart[0].id
    }
    const addedMealOrder = await MealOrder.create(newMealOrder)
    const addedMeal = await Meal.findByPk(req.body.mealId)
    const response = {
      cart: userCart[0],
      addedMeal,
      addedMealOrder
    }
    res.json(response)
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const userCart = await Order.findByPk(req.body.orderId)
    userCart.totalPrice = req.body.totalPrice
    userCart.isCart = false
    await userCart.save()
    const mealOrders = await MealOrder.findAll({
      where: {
        orderId: req.body.orderId
      }
    })
    await Promise.all(
      mealOrders.map(async mealOrder => {
        const {price} = await Meal.findByPk(mealOrder.mealId)
        mealOrder.price = price
        mealOrder.save()
      })
    )
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})

router.delete('/', async (req, res, next) => {
  try {
    await MealOrder.destroy({
      where: {
        mealId: req.body.mealId,
        orderId: req.body.orderId
      }
    })
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
