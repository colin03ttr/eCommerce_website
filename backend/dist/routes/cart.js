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
const router = (0, express_1.Router)();
/**
 * @swagger
 * /api/carts:
 *   get:
 *     summary: Get all carts
 *     tags:
 *       - Carts
 *     responses:
 *       200:
 *         description: A list of all carts.
 *       500:
 *         description: Server error.
 */
router.get('/api/carts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carts = yield cart_1.default.findAll({ include: [{ model: watch_1.default }] });
        res.json(carts);
    }
    catch (err) {
        console.error('Error fetching carts:', err);
        res.status(500).json({ message: 'Failed to fetch carts.', error: err });
    }
}));
/**
 * @swagger
 * /api/carts/{id}:
 *   get:
 *     summary: Get a cart by ID
 *     tags:
 *       - Carts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Cart ID
 *     responses:
 *       200:
 *         description: Cart details.
 *       404:
 *         description: Cart not found.
 *       500:
 *         description: Server error.
 */
router.get('/api/carts/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const cart = yield cart_1.default.findByPk(id, { include: [{ model: watch_1.default }] });
        if (cart) {
            res.json(cart);
        }
        else {
            res.status(404).json({ error: 'Cart not found.' });
        }
    }
    catch (err) {
        console.error('Error fetching cart:', err);
        res.status(500).json({ message: 'Failed to fetch cart.', error: err });
    }
}));
/**
 * @swagger
 * /api/carts/{id}:
 *   put:
 *     summary: Update a cart by ID
 *     tags:
 *       - Carts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Cart ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               watchId:
 *                 type: integer
 *                 example: 1
 *               quantity:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Cart updated successfully.
 *       404:
 *         description: Cart not found.
 *       500:
 *         description: Server error.
 */
router.put('/api/carts/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { watchId, quantity } = req.body;
    try {
        const updated = yield cart_1.default.update({ watchId, quantity }, { where: { id } });
        if (updated[0] > 0) {
            res.json({ message: 'Cart updated successfully.' });
        }
        else {
            res.status(404).json({ error: 'Cart not found.' });
        }
    }
    catch (err) {
        console.error('Error updating cart:', err);
        res.status(500).json({ message: 'Failed to update cart.', error: err });
    }
}));
exports.default = router;
