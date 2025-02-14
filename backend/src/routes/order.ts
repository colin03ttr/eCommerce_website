import { Router, Request, Response } from 'express';

import Order from '../models/order';
import OrderWatch from '../models/orderWatch';
import Watch from '../models/watch';
import User from '../models/user';


const router = Router();
Order.associate();
OrderWatch.associate();

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
router.get('/api/orders', async (req: Request, res: Response) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: OrderWatch,
          as: 'items',
          include: [{ model: Watch, as: 'watch' }],
        },
      ],
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders.' });
  }
});


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
router.get('/api/orders/:id', async (req: Request, res: Response) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findByPk(orderId);
        if (!order) {
            res.status(404).json({ error: 'Order not found.' });
        } else {
            res.json(order);
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch order.' });
    }
});



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
router.get('/api/orders/pending/:userId', async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const pendingOrders = await Order.findAll({
            where: {
                status: 'pending',
            },
        });

        if (pendingOrders) {
            res.json(pendingOrders);
        } else {
            res.status(404).json({ message: 'No pending orders found.' });
        }
    } catch (err) {
        console.error('Error fetching pending order:', err);
        res.status(500).json({ error: 'Server error.' });
    }
});

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
router.post('/api/orders/:orderId/add', async (req: Request, res: Response): Promise<void> => {
    const { orderId } = req.params;
    const { watchId, quantity } = req.body;

    try {
        const order = await Order.findByPk(orderId);

        if (!order) {
            res.status(404).json({ message: 'Order not found.' });
            return; // Assurez-vous de terminer l'exécution après une réponse.
        }

        await OrderWatch.create({
            orderId: order.id,
            watchId,
            quantity,
        });

        res.status(200).json({ message: 'Item added to the order successfully.' });
    } catch (err) {
        console.error('Error adding item to order:', err);
        res.status(500).json({ error: 'Server error.' });
    }
});



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
router.post('/api/orders', async (req: Request, res: Response) => {
    const { userId, status = 'pending' } = req.body;

    try {
        // Vérification des champs requis
        if (!userId) {
            res.status(400).json({ error: 'User ID is required.' });
            return;
        }

        // Vérification de l'utilisateur
        const user = await User.findByPk(userId);
        if (!user) {
            res.status(404).json({ error: 'User not found.' });
            return;
        }

        // Création de la commande
        const newOrder = await Order.create({
            userId: user.id,
            status,
        });

        // Réponse de succès
        res.status(201).json({
            message: 'Order created successfully.',
            order: newOrder,
        });
    } catch (err) {
        console.error('Error during order creation:', err);
        res.status(500).json({ error: 'Failed to create order.' });
    }
});


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
router.get('/api/orders/:orderId', async (req: Request, res: Response) => {
    const { orderId } = req.params;

    try {
        const order = await Order.findByPk(orderId, { include: [{ model: OrderWatch, as: 'items' }] });

        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found.' });
        }
    } catch (err) {
        console.error('Error fetching order:', err);
        res.status(500).json({ error: 'Server error.' });
    }
});


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
router.get(
    '/api/users/:userId/orders/pending',
    async (req: Request<{ userId: string }>, res: Response): Promise<void> => {
      const { userId } = req.params;
  
      try {
        const order = await Order.findOne({
          where: { userId: parseInt(userId, 10), status: 'pending' },
          include: [
            {
              model: OrderWatch,
              as: 'items',
              include: [{ model: Watch, as: 'watch' }],
            },
          ],
        });
  
        if (!order) {
          res.status(404).json({ error: 'No pending orders found.' });
          return;
        }
  
        res.status(200).json(order);
      } catch (err) {
        console.error('Error fetching pending order:', err);
        res.status(500).json({ error: 'Server error.' });
      }
    }
  );

  /**
 * @swagger
 * /api/orders/finished:
 *   get:
 *     summary: Get all finished orders
 *     tags:
 *       - Orders
 *     responses:
 *       200:
 *         description: A list of all finished orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       500:
 *         description: Server error
 */
  router.get('/api/orders/finished', async (req: Request, res: Response) => {
    try {
      const finishedOrders = await Order.findAll({
        where: { status: 'finished' },
        include: [
          {
            model: OrderWatch,
            as: 'items',
            include: [{ model: Watch, as: 'watch' }],
          },
        ],
      });
  
      if (!finishedOrders) {
        res.status(404).json({ error: 'No finished orders found.' });
        return;
      }
  
      res.status(200).json(finishedOrders);
    } catch (err) {
      console.error('Error fetching finished orders:', err);
      res.status(500).json({ error: 'Failed to fetch order.' });
    }
  });
  
/**
 * @swagger
 * /api/orders/{orderId}/complete/{userId}:
 *   post:
 *     summary: Complete an order
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the order to complete
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user completing the order
 *     responses:
 *       200:
 *         description: Order completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Order completed successfully.
 *       400:
 *         description: Invalid order, status, or insufficient balance
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid order or status.
 *       500:
 *         description: Server error
 */
router.post(
    '/api/orders/:orderId/complete/:userId',
    async (req: Request, res: Response): Promise<void> => {
      try {
        const { orderId, userId } = req.params;
  
        const order = await Order.findByPk(orderId, {
          include: [
            {
              model: OrderWatch,
              as: 'items',
            },
          ],
        });
  
        if (!order || order.status !== 'pending') {
          res.status(400).json({ error: 'Invalid order or status.' });
          return;
        }
  
        const totalPrice = await Promise.all(
          order.items.map(async (item) => {
            const watch = await Watch.findByPk(item.watchId);
            if (!watch) {
              throw new Error(`Watch with ID ${item.watchId} not found.`);
            }
            return item.quantity * watch.price;
          })
        ).then((prices) => prices.reduce((sum, price) => sum + price, 0));
  
        const user = await User.findByPk(userId);
  
        if (!user || user.solde < totalPrice) {
          res.status(400).json({ error: 'Insufficient balance.' });
          return;
        }
  
        user.solde -= totalPrice;
        await user.save();
  
        order.status = 'finished';
        await order.save();
  
        res.status(200).json({ message: 'Order completed successfully.' });
      } catch (err) {
        console.error('Error completing order:', err);
        res.status(500).json({ error: 'Server error.' });
      }
    }
  );
  /**
 * @swagger
 * /api/users/{userId}/orders:
 *   get:
 *     summary: Get all orders of a user
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
 *         description: List of orders for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       404:
 *         description: User or orders not found
 *       500:
 *         description: Server error
 */
router.get(
    '/api/users/:userId/orders',
    async (req: Request<{ userId: string }>, res: Response): Promise<void> => {
      try {
        const { userId } = req.params;
  
        // Récupération des commandes associées à l'utilisateur
        const orders = await Order.findAll({
          where: { userId },
          include: [
            {
              model: OrderWatch,
              as: 'items',
              include: [
                {
                  model: Watch,
                  as: 'watch',
                },
              ],
            },
          ],
        });
  
        if (!orders || orders.length === 0) {
          res.status(404).json({ error: 'No orders found for the user.' });
          return;
        }
  
        res.status(200).json(orders);
      } catch (err) {
        console.error('Error fetching user orders:', err);
        res.status(500).json({ error: 'Server error.' });
      }
    }
  );
  
  //delete an order by id
  /**
   * @swagger
   * /api/orders/{orderId}:
   *   delete:
   *     summary: Delete an order by ID
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
   *         description: Order deleted successfully
   *       404:
   *         description: Order not found
   *       500:
   *         description: Server error
   */
  router.delete('/api/orders/:orderId', async (req: Request, res: Response) => {
    const { orderId } = req.params;
  
    try {
      const order = await Order.findByPk(orderId);
  
      if (!order) {
        res.status(404).json({ error: 'Order not found.' });
        return;
      }
  
      await order.destroy();
  
      res.status(200).json({ message: 'Order deleted successfully.' });
    } catch (err) {
      console.error('Error deleting order:', err);
      res.status(500).json({ error: 'Server error.' });
    }
  });
  
// Update an order by ID
/**
 * @swagger
 * /api/orders/{orderId}:
 *   put:
 *     summary: Update an order by ID
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the order to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               totalPrice:
 *                 type: number
 *                 description: The updated total price of the order.
 *                 example: 10
 *     responses:
 *       200:
 *         description: Order updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Order updated successfully.
 *                 order:
 *                   $ref: '#/components/schemas/Order'
 *       400:
 *         description: Invalid data or order not found
 *       500:
 *         description: Server error
 */
router.put('/api/orders/:orderId', async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const { totalPrice } = req.body;
  
    try {
      const order = await Order.findByPk(orderId);
  
      if (!order) {
        res.status(400).json({ error: 'Order not found.' });
        return;
      }

      order.totalPrice = totalPrice || order.totalPrice;
  
      await order.save();
  
      res.status(200).json({ message: 'Order updated successfully.', order });
    } catch (err) {
      console.error('Error updating order:', err);
      res.status(500).json({ error: 'Server error.' });
    }
  });

  // Get the count and total spent by a user
  /**
   * @swagger
   * /api/users/{userId}/orders/summary:
   *   get:
   *     summary: Get the count and total spent by a user
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
   *         description: Count and total spent by the user
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 count:
   *                   type: integer
   *                   example: 5
   *                 total:
   *                   type: number
   *                   example: 100
   *       404:
   *         description: User not found
   *       500:
   *         description: Server error
   */
  router.get('/api/users/:userId/orders/summary', async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
      const user = await User.findByPk(userId);

      if (!user) {
        res.status(404).json({ error: 'User not found.' });
        return;
      }

      const [orderCount, totalSpent] = await Promise.all([
        Order.count({ where: { userId } }),
        Order.sum('totalPrice', { where: { userId } }),
      ]);

      res.status(200).json({ count: orderCount, total: totalSpent || 0 });
    } catch (err) {
      console.error('Error fetching order summary:', err);
      res.status(500).json({ error: 'Server error.' });
    }
  });

export default router;
