import { Router } from "express";
import Watch from "../models/watch";

const router = Router();

// Get all watches
/**
 * @swagger
 * /api/watches:
 *   get:
 *     summary: Get all watches.
 *     tags:
 *       - Watches
 *     responses:
 *       200:
 *         description: A list of watches.
 *       500:
 *         description: Server error.
 */
router.get('/api/watches', async (req, res) => {
    try {
        const watches = await Watch.findAll();
        res.json(watches);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch watches.\n', error: err })
    }
});

// Get a single watch by id
/**
 * @swagger
 * /api/watches/{id}:
 *   get:
 *     summary: Get a watch by id.
 *     tags:
 *       - Watches
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Watch id.
 *     responses:
 *       200:
 *         description: Watch details.
 *       404:
 *         description: Watch not found.
 *       500:
 *         description: Server error.
 */
router.get('/api/watches/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const watch = await Watch.findByPk(id);
        if (watch) {
            res.json(watch);
        } else {
            res.status(404).json({ error: 'Watch not found.' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch watch.\n', error: err })
    }
});

// Update a watch by id
/**
 * @swagger
 * /api/watches/{id}:
 *   put:
 *     summary: Update a watch by id.
 *     tags:
 *       - Watches
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Watch id.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Watch'
 *     responses:
 *       200:
 *         description: Watch updated successfully.
 *       404:
 *         description: Watch not found.
 *       500:
 *         description: Server error.
 */
router.put('/api/watches/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, price, imageurl, brand } = req.body;
    try {
        const watch = await Watch.findByPk(id);
        if (watch) {
            watch.name = name;
            watch.description = description;
            watch.price = price;
            watch.imageurl = imageurl;
            watch.brand = brand;
            await watch.save();
            res.json({ message: 'Watch updated successfully.' });
        } else {
            res.status(404).json({ error: 'Watch not found.' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Failed to update watch.\n', error: err })
    }
});
export default router;