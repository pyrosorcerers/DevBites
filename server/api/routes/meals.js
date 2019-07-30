const router = require('express').Router()
const Meal = require('../../db/models/meal')
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
