const router = require('express').Router()
const {Meal} = require('../../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    let mealList
    if (!req.query.id) {
      // cater towards pagination queries
      const {limit, offset} = req.query
      mealList = await Meal.findAll({
        order: [['id', 'ASC']],
        limit,
        offset
      })
    } else {
      // cater towards array queries
      mealList = await Meal.findAll({
        where: {
          id: req.query.id
        }
      })
    }
    res.json(mealList)
  } catch (err) {
    next(err)
  }
})

router.get('/count', async (req, res, next) => {
  try {
    const mealCount = await Meal.count()
    res.json(mealCount)
  } catch (err) {
    next(err)
  }
})
