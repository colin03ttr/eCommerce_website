"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_1 = require("../models/order");
const orderItem_1 = require("../models/orderItem");
const watch_1 = __importDefault(require("../models/watch"));
const auth_1 = require("./auth");
const orderRouter = (0, express_1.Router)();
// Get orders for a user
orderRouter.get('/orders', auth_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_1.Order.findAll({
            where: { userId: req.user.id },
            include: [
                {
                    model: orderItem_1.OrderItem,
                    include: [watch_1.default], // Inclure les montres pour plus de détails
                },
            ],
        });
        res.json(orders);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching orders.' });
    }
}));
exports.default = orderRouter;
