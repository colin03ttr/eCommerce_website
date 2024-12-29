"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItem = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../sequelize"));
class OrderItem extends sequelize_1.Model {
}
exports.OrderItem = OrderItem;
OrderItem.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    orderId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    watchId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    sequelize: sequelize_2.default,
    tableName: 'order_items',
    timestamps: false,
});
exports.default = OrderItem;
