import { Router } from "express";
import User from "../models/user";
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();

const JWT_SECRET = '71c08c0e94e1fb75b31733d23416714071e039664965176b85880f8925abf662'; 

// Login user
/**
 * @openapi
 * /api/login-page:
 *   post:
 *     summary: Login a user
 *     description: Authenticates a user using email and password, then returns a JWT token.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: colin@gmail.fr
 *               password:
 *                 type: string
 *                 example: colin
 *     responses:
 *       200:
 *         description: Login successful. Returns a JWT token and user details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 * 
 *                      id_user: string
 *                          type: string
 *       400:
 *         description: Missing email or password.
 *       404:
 *         description: User not found.
 *       401:
 *         description: Invalid password.
 *       500:
 *         description: Internal server error.
 */
router.post('/api/login-page', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            res.status(400).json({ error: `Email and password are required. : ${req.body}` });
            return;
        }

        const user = await User.findOne({ where: { email } });

        if (!user) {
            res.status(404).json({ error: 'User not found.' });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ error: 'Invalid password.' });
            return;
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, name: user.name },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            message: 'Login successful.',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                solde: user.solde,
                discount: user.discount,
                isAdmin: user.isAdmin
            }
        });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ error: 'An error occurred during login.' });
    }
});

/**
 * @swagger
 * /api/profile:
 *   get:
 *     summary: Récupère le profil utilisateur via un token JWT
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User profile data retrieved successfully
 *       401:
 *         description: Unauthorized - No token or invalid token
 */
router.get('/api/profile', authenticateToken, async (req: any, res: Response) => {
    try {
        const user = await User.findByPk((req as any).user.id);

        if (!user) {
            res.status(404).json({ error: 'User not found.' });
            return;
        }

        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            solde: user.solde,
            creationDate: user.creationdate,
            discount: user.discount,
            isAdmin: user.isAdmin
        });
    } catch (err) {
        console.error('Error fetching profile:', err);
        res.status(500).json({ error: 'An error occurred while fetching the profile.' });
    }
});
router.put('/api/profile', authenticateToken, async (req: any, res: Response) => {
    try {
        const user = await User.findByPk((req as any).user.id);

        if (!user) {
            res.status(404).json({ error: 'User not found.' });
            return;
        }

        if (req.body.name) {
            user.name = req.body.name;
        }
        if (req.body.email) {
            user.email = req.body.email;
        }
        if (req.body.solde) {
            user.solde = req.body.solde;
        }
        if (req.body.discount) {
            user.discount = req.body.discount;
        }

        await user.save();

        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            solde: user.solde,
            creationDate: user.creationdate,
            discount: user.discount,
            isAdmin: user.isAdmin
        });
    } catch (err) {
        console.error('Error updating profile:', err);
        res.status(500).json({ error: 'An error occurred while updating the profile.' });
    }
});

export function authenticateToken(req: Request, res: Response, next: NextFunction): void {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        res.status(401).json({ error: 'Access denied. No token provided.' });
        return; // Assurez-vous de retourner pour arrêter le middleware
    }

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        (req as any).user = verified; // Ajouter la propriété user à la requête
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid or expired token.' });
        return; // Retourner après la réponse pour éviter tout traitement supplémentaire
    }
}

export default router;