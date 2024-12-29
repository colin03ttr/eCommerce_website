import { Router, Request, Response } from 'express';
import Cart from '../models/cart';
import Watch from '../models/watch';

const router = Router();

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
router.get('/api/carts', async (req: Request, res: Response) => {
    try {
        const carts = await Cart.findAll({ include: [{ model: Watch }] });
        res.json(carts);
    } catch (err) {
        console.error('Error fetching carts:', err);
        res.status(500).json({ message: 'Failed to fetch carts.', error: err });
    }
});

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
router.get('/api/carts/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const cart = await Cart.findByPk(id, { include: [{ model: Watch }] });
        if (cart) {
            res.json(cart);
        } else {
            res.status(404).json({ error: 'Cart not found.' });
        }
    } catch (err) {
        console.error('Error fetching cart:', err);
        res.status(500).json({ message: 'Failed to fetch cart.', error: err });
    }
});

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
router.put('/api/carts/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { watchId, quantity } = req.body;
    try {
        const updated = await Cart.update(
            { watchId, quantity },
            { where: { id } }
        );
        if (updated[0] > 0) {
            res.json({ message: 'Cart updated successfully.' });
        } else {
            res.status(404).json({ error: 'Cart not found.' });
        }
    } catch (err) {
        console.error('Error updating cart:', err);
        res.status(500).json({ message: 'Failed to update cart.', error: err });
    }
});

export default router;
