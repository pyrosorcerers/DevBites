const Sequelize = require('sequelize')
const db = require('../db')
const Meal = require('./meal')

const MealOrder = db.define('mealOrder', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER
  }
})

const getPrice = async mealOrder => {
  const {price} = await Meal.findByPk(mealOrder.mealId)
  mealOrder.price = price
}

MealOrder.beforeCreate(getPrice)

module.exports = MealOrder
