const Sequelize = require('sequelize')
const db = require('../db')

const MealOrder = db.define('mealOrder', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = MealOrder
