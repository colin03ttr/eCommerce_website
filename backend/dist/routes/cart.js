const express = require('express');
const router = express.Router();
const { Cart, CartItem } = require('../models'); // Si vous avez un modèle pour Cart et CartItem
const { authenticateToken } = require('./auth'); // Middleware d'authentification, si utilisé

// Exemple de route GET pour récupérer les articles du panier
router.get('/cart', authenticateToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ where: { userId: req.user.id } });
    if (!cart) {
      return res.json({ items: [] });
    }

    const items = await CartItem.findAll({
      where: { cartId: cart.id },
      include: ['Watch'], // Assurez-vous d'avoir une relation Watch définie
    });

    res.json({ items });
  } catch (err) {
    console.error('Error fetching cart:', err);
    res.status(500).json({ error: 'An error occurred while fetching the cart.' });
  }
});

module.exports = router;
