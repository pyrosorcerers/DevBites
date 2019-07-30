const Sequelize = require('sequelize')
const db = require('../db')

const Meal = db.define('meal', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  calories: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  ingredients: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false
  }
})

module.exports = Meal
