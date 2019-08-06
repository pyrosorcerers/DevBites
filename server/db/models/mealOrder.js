const Sequelize = require('sequelize')
const db = require('../db')
const Meal = require('./meal')

const MealOrder = db.define('mealOrder', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    validate: {
      min: 10
    }
  }
})

module.exports = MealOrder
