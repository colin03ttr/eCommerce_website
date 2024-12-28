const express = require('express');
const Order = require('../models/order');
const OrderItem = require('../models/orderItem');
const { authenticateToken } = require('./auth');

const router = express.Router();

// Récupérer toutes les commandes d'un utilisateur
router.get('/', authenticateToken, async (req, res) => {
    try {
        const orders = await Order.findAll({ where: { userId: req.user.id } });
        res.json({ orders });
    } catch (err) {
        console.error('Error fetching orders:', err);
        res.status(500).json({ error: 'An error occurred while fetching orders.' });
    }
});

// Créer une nouvelle commande
router.post('/', authenticateToken, async (req, res) => {
    const { items } = req.body; // Les articles de la commande
    try {
        let totalAmount = 0;

        // Calculer le montant total de la commande
        for (const item of items) {
            totalAmount += item.price * item.quantity;
        }

        // Créer la commande
        const order = await Order.create({
            userId: req.user.id,
            totalAmount,
        });

        // Ajouter les articles à la commande
        for (const item of items) {
            await OrderItem.create({
                orderId: order.id,
                watchId: item.watchId,
                quantity: item.quantity,
                price: item.price,
            });
        }

        res.status(201).json({ message: 'Order created successfully.', order });
    } catch (err) {
        console.error('Error creating order:', err);
        res.status(500).json({ error: 'An error occurred while creating the order.' });
    }
});

module.exports = router;
