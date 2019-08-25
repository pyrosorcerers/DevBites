const router = require('express').Router()
const {Order} = require('../../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    let orderList = await Order.findAll({
      where: {
        id: req.query.id
      }
    })
    res.json(orderList)
  } catch (err) {
    next(err)
  }
})

// router.get('/count', async (req, res, next) => {
//   try {
//     const mealCount = await Meal.count()
//     res.json(mealCount)
//   } catch (err) {
//     next(err)
//   }
// })
