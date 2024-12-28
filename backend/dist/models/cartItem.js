const { DataTypes, Model } = require('sequelize');
const sequelize = require('../sequelize');
const Cart = require('./cart');
const Watch = require('./watch');

class CartItem extends Model {}

CartItem.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    cartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: Cart, key: 'id' },
    },
    watchId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: Watch, key: 'id' },
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'cart_items',
    timestamps: false,
});

CartItem.belongsTo(Cart, { foreignKey: 'cartId' });
Cart.hasMany(CartItem, { foreignKey: 'cartId' });

CartItem.belongsTo(Watch, { foreignKey: 'watchId' });
Watch.hasMany(CartItem, { foreignKey: 'watchId' });

module.exports = CartItem;
