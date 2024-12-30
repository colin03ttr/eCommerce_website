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
const order_1 = __importDefault(require("../models/order"));
const orderWatch_1 = __importDefault(require("../models/orderWatch"));
const watch_1 = __importDefault(require("../models/watch"));
const user_1 = __importDefault(require("../models/user"));
const router = (0, express_1.Router)();
order_1.default.associate();
orderWatch_1.default.associate();
/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders.
 *     tags:
 *       - Orders
 *     responses:
 *       200:
 *         description: A list of orders.
 *       500:
 *         description: Server error.
 */
router.get('/api/orders', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_1.default.findAll();
        res.json(orders);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch orders.' });
    }
}));
/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get a single order by ID.
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Order ID.
 *     responses:
 *       200:
 *         description: Order details.
 *       404:
 *         description: Order not found.
 *       500:
 *         description: Server error.
 */
router.get('/api/orders/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderId = req.params.id;
        const order = yield order_1.default.findByPk(orderId);
        if (!order) {
            res.status(404).json({ error: 'Order not found.' });
        }
        else {
            res.json(order);
        }
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch order.' });
    }
}));
/**
 * @swagger
 * /api/orders/pending:
 *   get:
 *     summary: Retrieve all pending orders
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: The pending order
 *       404:
 *         description: No pending order found
 *       500:
 *         description: Server error
 */
router.get('/api/orders/pending/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const pendingOrders = yield order_1.default.findAll({
            where: {
                status: 'pending',
            },
        });
        if (pendingOrders) {
            res.json(pendingOrders);
        }
        else {
            res.status(404).json({ message: 'No pending orders found.' });
        }
    }
    catch (err) {
        console.error('Error fetching pending order:', err);
        res.status(500).json({ error: 'Server error.' });
    }
}));
/**
 * @swagger
 * /api/orders/{orderId}/add:
 *   post:
 *     summary: Add an item to an existing order
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               watchId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Item added successfully
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */
router.post('/api/orders/:orderId/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.params;
    const { watchId, quantity } = req.body;
    try {
        const order = yield order_1.default.findByPk(orderId);
        if (!order) {
            res.status(404).json({ message: 'Order not found.' });
            return; // Assurez-vous de terminer l'exécution après une réponse.
        }
        yield orderWatch_1.default.create({
            orderId: order.id,
            watchId,
            quantity,
        });
        res.status(200).json({ message: 'Item added to the order successfully.' });
    }
    catch (err) {
        console.error('Error adding item to order:', err);
        res.status(500).json({ error: 'Server error.' });
    }
}));
/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags:
 *       - Orders
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: number
 *                 example: 1
 *               status:
 *                 type: string
 *                 example: pending
 *     responses:
 *       201:
 *         description: Order created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Order created successfully.
 *                 order:
 *                   type: object
 *       400:
 *         description: Missing required fields or user not found.
 *       500:
 *         description: Server error.
 */
router.post('/api/orders', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, status = 'pending' } = req.body;
    try {
        // Vérification des champs requis
        if (!userId) {
            res.status(400).json({ error: 'User ID is required.' });
            return;
        }
        // Vérification de l'utilisateur
        const user = yield user_1.default.findByPk(userId);
        if (!user) {
            res.status(404).json({ error: 'User not found.' });
            return;
        }
        // Création de la commande
        const newOrder = yield order_1.default.create({
            userId: user.id,
            status,
        });
        // Réponse de succès
        res.status(201).json({
            message: 'Order created successfully.',
            order: newOrder,
        });
    }
    catch (err) {
        console.error('Error during order creation:', err);
        res.status(500).json({ error: 'Failed to create order.' });
    }
}));
/**
 * @swagger
 * /api/orders/{orderId}:
 *   get:
 *     summary: Get a specific order by ID
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The order details
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */
router.get('/api/orders/:orderId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.params;
    try {
        const order = yield order_1.default.findByPk(orderId, { include: [{ model: orderWatch_1.default, as: 'items' }] });
        if (order) {
            res.json(order);
        }
        else {
            res.status(404).json({ message: 'Order not found.' });
        }
    }
    catch (err) {
        console.error('Error fetching order:', err);
        res.status(500).json({ error: 'Server error.' });
    }
}));
/**
 * @swagger
 * /api/users/{userId}/orders/pending:
 *   get:
 *     summary: Get a user's pending order
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: The user's pending order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: No pending orders found
 *       500:
 *         description: Server error
 */
router.get('/api/users/:userId/orders/pending', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const order = yield order_1.default.findOne({
            where: { userId: parseInt(userId, 10), status: 'pending' },
            include: [
                {
                    model: orderWatch_1.default,
                    as: 'items',
                    include: [{ model: watch_1.default, as: 'watch' }],
                },
            ],
        });
        if (!order) {
            res.status(404).json({ error: 'No pending orders found.' });
            return;
        }
        res.status(200).json(order);
    }
    catch (err) {
        console.error('Error fetching pending order:', err);
        res.status(500).json({ error: 'Server error.' });
    }
}));
exports.default = router;
