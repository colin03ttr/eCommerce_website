"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/cart.ts
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../sequelize"));
const watch_1 = __importDefault(require("./watch"));
class Cart extends sequelize_1.Model {
}
Cart.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    watchId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: watch_1.default,
            key: 'id',
        },
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
}, { sequelize: sequelize_2.default, modelName: 'Cart' });
Cart.belongsTo(watch_1.default, { foreignKey: 'watchId', as: 'Watch' });
exports.default = Cart;
