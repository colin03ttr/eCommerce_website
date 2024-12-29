"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../sequelize"));
const watch_1 = __importDefault(require("./watch"));
const order_1 = __importDefault(require("./order"));
class OrderWatch extends sequelize_1.Model {
    static associate() {
        this.belongsTo(watch_1.default, { as: 'watch', foreignKey: 'watchId' });
        this.belongsTo(order_1.default, { as: 'order', foreignKey: 'orderId' });
    }
}
OrderWatch.init({
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
        defaultValue: 1,
    },
}, {
    sequelize: sequelize_2.default,
    modelName: 'OrderWatch',
});
exports.default = OrderWatch;
