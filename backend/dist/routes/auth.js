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
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
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
 *       400:
 *         description: Missing email or password.
 *       404:
 *         description: User not found.
 *       401:
 *         description: Invalid password.
 *       500:
 *         description: Internal server error.
 */
router.post('/api/login-page', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            res.status(400).json({ error: `Email and password are required. : ${req.body}` });
            return;
        }
        const user = yield user_1.default.findOne({ where: { email } });
        if (!user) {
            res.status(404).json({ error: 'User not found.' });
            return;
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ error: 'Invalid password.' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '1h' });
        res.json({
            message: 'Login successful.',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                solde: user.solde,
                discount: user.discount
            }
        });
    }
    catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ error: 'An error occurred during login.' });
    }
}));
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
router.get('/api/profile', authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findByPk(req.user.id);
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
            discount: user.discount
        });
    }
    catch (err) {
        console.error('Error fetching profile:', err);
        res.status(500).json({ error: 'An error occurred while fetching the profile.' });
    }
}));
function authenticateToken(req, res, next) {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        res.status(401).json({ error: 'Access denied. No token provided.' });
        return; // Assurez-vous de retourner pour arrêter le middleware
    }
    try {
        const verified = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = verified; // Ajouter la propriété user à la requête
        next();
    }
    catch (err) {
        res.status(401).json({ error: 'Invalid or expired token.' });
        return; // Retourner après la réponse pour éviter tout traitement supplémentaire
    }
}
exports.default = router;
