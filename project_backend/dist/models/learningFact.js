"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../sequelize"));
class LearningFact extends sequelize_1.Model {
}
// Define the Sequelize model
LearningFact.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    fact: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    packageId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: sequelize_2.default,
    modelName: 'LearningFact',
    tableName: 'learning_facts',
    timestamps: false,
});
exports.default = LearningFact;
