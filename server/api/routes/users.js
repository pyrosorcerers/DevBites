const router = require('express').Router()
const {User, Meal, Order, MealOrder} = require('../../db/models')
// const Orders = require('../../db/models/order')
// const mealOrder = require('../../db/models/mealOrder')
// const Meals = require('../../db/models/meal')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    //req.user.isadmin (ADMIN GATEWAY)
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

// is the right user gateway?
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

router.get('/:id/cart', async (req, res, next) => {
  try {
    const userCart = await Order.findOne({
      include: [{model: Meal}],
      where: {
        userId: req.params.id,
        isCart: true
      }
    })
    await userCart.meals.forEach(async meal => {
      await meal.mealOrder.setNewPrice()
    })
    // every meal order setNewPrice()

    // CALCULATE TOTAL PRICE OF CART
    await userCart.setTotalPrice()
    res.json(userCart)
  } catch (err) {
    next(err)
  }
})

// PRICE ONLY BECOMES FIXED WHEN WE SUBMIT CART TO CHECKOUT

// MOVE THIS TO USER FOR RESTFUL API
// ADD TO CART ROUTE
router.post('/:id/cart', async (req, res, next) => {
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
    // TOTAL ORDER PRICE UPDATED WHEN USER CHECKS CART
    // PRICES ARE STILL DYNAMIC WHEN IN THE CART, FIXED WHEN ORDERED
    res.json(addedMealOrder)
  } catch (err) {
    next(err)
  }
})
