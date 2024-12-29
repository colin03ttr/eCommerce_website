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
const cart_1 = __importDefault(require("../models/cart"));
const watch_1 = __importDefault(require("../models/watch"));
const cartRouter = (0, express_1.Router)();
/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get all items in the cart
 *     tags:
 *       - Cart
 *     responses:
 *       200:
 *         description: List of cart items.
 *       500:
 *         description: Server error.
 */
cartRouter.get('/api/cart', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cartItems = yield cart_1.default.findAll({ include: [{ model: watch_1.default, as: 'Watch' }] });
        res.json(cartItems);
    }
    catch (err) {
        console.error('Error fetching cart items:', err);
        res.status(500).json({ error: 'Failed to fetch cart items.' });
    }
}));
/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Add an item to the cart
 *     tags:
 *       - Cart
 *     responses:
 *       201:
 *         description: Item added to the cart.
 *       500:
 *         description: Server error.
 */
/*cartRouter.post('/api/cart', async (req, res) => {
  const { watchId, quantity } = req.body;
  try {
    const item = await Cart.create({ watchId, quantity });
    res.status(201).json(item);
  } catch (err) {
    console.error('Error adding item to cart:', err);
    res.status(500).json({ error: 'Failed to add item to cart.' });
  }
});
*/
exports.default = cartRouter;
