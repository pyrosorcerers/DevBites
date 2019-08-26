const User = require('./user')
const Meal = require('./meal')
const Order = require('./order')
const MealOrder = require('./mealOrder')

User.hasMany(Order)
Order.belongsTo(User)

Order.belongsToMany(Meal, {through: MealOrder})
Meal.belongsToMany(Order, {through: MealOrder})

module.exports = {
  User,
  Meal,
  Order,
  MealOrder
}
