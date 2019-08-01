const router = require('express').Router()
const {User, Meal, Order, MealOrder} = require('../../db/models')
module.exports = router

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
    const userCart = await Order.findOne({
      where: {
        userId: req.body.userId,
        isCart: true
      }
    })
    const newMealOrder = {
      quantity: req.body.quantity,
      mealId: req.body.mealId,
      orderId: userCart.id
    }
    const addedMealOrder = await MealOrder.create(newMealOrder)
    // UPDATE TOTAL PRICE OF ORDER
    // TOTAL ORDER PRICE UPDATED WHEN USER CHECKS CART
    // PRICES ARE STILL DYNAMIC WHEN IN THE CART, FIXED WHEN ORDERED
    res.json(addedMealOrder)
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
