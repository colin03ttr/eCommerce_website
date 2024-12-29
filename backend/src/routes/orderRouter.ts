import { Router } from 'express';
import { Order } from '../models/order';
import { OrderItem } from '../models/orderItem';
import Watch from '../models/watch';
import { authenticateToken } from './auth';

const orderRouter = Router();

// Get orders for a user
orderRouter.get('/orders', authenticateToken, async (req: any, res) => {
    try {
        const orders = await Order.findAll({
            where: { userId: req.user.id },
            include: [
                {
                    model: OrderItem,
                    include: [Watch], // Inclure les montres pour plus de détails
                },
            ],
        });

        res.json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching orders.' });
    }
});

export default orderRouter;
