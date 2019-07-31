const router = require('express').Router()
const {Meal, MealOrder, Order} = require('../../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const meals = await Meal.findAll()
    res.json(meals)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const singleMeal = await Meal.findByPk(req.params.id)
    res.json(singleMeal)
  } catch (err) {
    next(err)
  }
})

// ADD TO CART ROUTE
router.post('/:id', async (req, res, next) => {
  try {
    const userCart = await Order.findOne({
      where: {
        userId: req.user.id,
        isCart: true
      }
    })
    const newMealOrder = {
      quantity: 1,
      mealId: req.params.id,
      orderId: userCart.id
    }
    const addedMealOrder = await MealOrder.create(newMealOrder)
    // UPDATE TOTAL PRICE OF ORDER
    res.json(addedMealOrder)
  } catch (err) {
    next(err)
  }
})
