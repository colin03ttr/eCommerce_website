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
const router = (0, express_1.Router)();
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
router.get('/api/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.findAll();
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to fetch users.\n', error: err });
    }
}));
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
router.get('/api/users/:email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    try {
        const user = yield user_1.default.findByPk(email);
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({ error: 'User not found.' });
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to fetch user.\n', error: err });
    }
}));
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
router.post('/api/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, packages } = req.body;
    try {
        const newUser = yield user_1.default.create({ name, email, password, packages });
        res.status(201).json(newUser);
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to create user.\n', error: err });
    }
}));
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
router.put('/api/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, email, password, packages } = req.body;
    try {
        const updated = yield user_1.default.update({ name, email, password, packages }, { where: { id } });
        if (updated[0] > 0) {
            res.json({ message: 'User updated successfully.' });
        }
        else {
            res.status(404).json({ error: 'User not found.' });
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to update user.\n', error: err });
    }
}));
router.get('/api/users/:email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    if (!email) {
        res.status(400).json({ error: 'Email is required.' });
        return;
    }
    try {
        const user = yield user_1.default.findOne({ where: { email } });
        if (!user) {
            res.status(404).json({ error: 'User not found.' });
        }
        else {
            res.json(user);
        }
    }
    catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ message: 'Failed to fetch user.' });
    }
}));
exports.default = router;
