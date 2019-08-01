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

MealOrder.prototype.setNewPrice = async function() {
  const {price} = await Meal.findByPk(this.mealId)
  this.price = price
  this.save()
}

module.exports = MealOrder
