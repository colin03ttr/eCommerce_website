import { Router } from "express";
import User from "../models/user";

const router = Router();

// Get all users
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: A list of users.
 *       500:
 *         description: Server error.
 */
router.get('/api/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch users.\n', error: err });
    }
});


// Get a single user by ID
/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID.
 *     responses:
 *       200:
 *         description: User details.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Server error.
 */
router.get('/api/users/:email', async (req, res) => {
    const { email } = req.params;
    try {
        const user = await User.findByPk(email);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found.' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch user.\n', error: err });
    }
});

// Register a new user
/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Register a new user.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               packages:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: User created successfully.
 *       500:
 *         description: Server error.
 */
router.post('/api/users', async (req, res) => {
    const { name, email, password, packages } = req.body;
    try {
        const newUser = await User.create({ name, email, password, packages });
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create user.\n', error: err });
    }
});

// Update a user by ID
/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user by ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               packages:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Server error.
 */
router.put('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, password, packages } = req.body;
    try {
        const updated = await User.update({ name, email, password, packages }, { where: { id } });
        if (updated[0] > 0) {
            res.json({ message: 'User updated successfully.' });
        } else {
            res.status(404).json({ error: 'User not found.' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Failed to update user.\n', error: err });
    }
});



export default router;