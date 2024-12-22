import { Router } from "express";
import User from "../models/user";
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
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


// Get a single user by email
/**
 * @swagger
 * /api/users/{email}:
 *   get:
 *     summary: Get a user by email.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: User email.
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
        const user = await User.findOne({ where: { email } });
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
 *     summary: Register a new user
 *     description: Creates a new user account with a hashed password.
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
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully.
 *                 user:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       example: john@example.com
 *       400:
 *         description: Missing required fields.
 *       500:
 *         description: Server error.
 */
router.post('/api/users', async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {
        // Vérification des champs requis
        if (!name || !email || !password) {
            res.status(400).json({ error: 'Name, email, and password are required.' });
            return; // Arrête la fonction après l'envoi de la réponse
        }

        // Hachage du mot de passe
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Création de l'utilisateur avec le mot de passe haché
        const newUser = await User.create({ name, email, password: hashedPassword });

        // Réponse de succès
        res.status(201).json({
            message: 'User registered successfully.',
            user: { name: newUser.name, email: newUser.email },
        });
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).json({ error: 'Failed to register user.' });
    }
});

// Update a user by email
/**
 * @swagger
 * /api/users/{email}:
 *   put:
 *     summary: Update a user by email.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: User email.
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
 *               solde:
 *                 type: number
 *               creationDate:
 *                 type: DateTime
 *               discount:
 *                 type: number
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Server error.
 */
router.put('/api/users/:email', async (req, res) => {
    const { email } = req.params;
    const { id, name, email: newEmail, solde, discount } = req.body;
    try {
        const updated = await User.update(
            { id, name, email: newEmail, solde, discount },
            { where: { email } }
        );
        if (updated[0] > 0) {
            res.json({ message: 'User updated successfully.' });
        } else {
            res.status(404).json({ error: 'User not found.' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Failed to update user.\n', error: err });
    }
});

router.get('/api/users/:email', async (req: Request, res: Response): Promise<void> => {
    const { email } = req.params;
    if (!email) {
      res.status(400).json({ error: 'Email is required.' });
      return;
    }
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        res.status(404).json({ error: 'User not found.' });
      } else {
        res.json(user);
      }
    } catch (err) {
      console.error('Error fetching user:', err);
      res.status(500).json({ message: 'Failed to fetch user.' });
    }
  });
  


export default router;