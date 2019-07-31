const Sequelize = require('sequelize')
const db = require('../db')
const MealOrder = require('./mealOrder')

const Order = db.define('order', {
  isCart: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  totalPrice: {
    type: Sequelize.INTEGER
  }
})

Order.prototype.setTotalPrice = async function() {
  const mealOrders = await MealOrder.findAll({
    where: {
      orderId: this.id
    }
  })
  let totalPrice = 0
  mealOrders.forEach(mealOrder => {
    totalPrice += mealOrder.price
  })
  this.totalPrice = totalPrice
  this.save()
  console.log(totalPrice)
}

module.exports = Order
