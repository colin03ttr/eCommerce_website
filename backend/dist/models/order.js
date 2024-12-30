"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../sequelize"));
const orderWatch_1 = __importDefault(require("./orderWatch"));
class Order extends sequelize_1.Model {
    static associate() {
        this.hasMany(orderWatch_1.default, { as: 'items', foreignKey: 'orderId' });
    }
}
Order.init({
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending',
    },
    totalPrice: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
    }
}, {
    sequelize: sequelize_2.default,
    modelName: 'order',
});
exports.default = Order;
