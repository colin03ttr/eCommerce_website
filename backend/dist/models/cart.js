const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); // Assurez-vous que ceci pointe vers votre configuration Sequelize

const Cart = sequelize.define('Cart', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Cart;
