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
const LearningPackage_1 = __importDefault(require("../models/LearningPackage"));
const router = (0, express_1.Router)();
// Get all learning packages
/**
 * @openapi
 * /api/package:
 *   get:
 *     summary: Get all learning packages
 *     description: Retrieve a list of all learning packages
 *     responses:
 *       200:
 *         description: A list of learning packages
 */
router.get('/api/package/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const packages = yield LearningPackage_1.default.findAll({ order: [['id', 'ASC']] });
        res.json(packages);
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to fetch learning packages.', error: err });
    }
}));
// Get a single learning package by ID
/**
 * @swagger
 * /api/package/{id}:
 *   get:
 *     summary: Get a learning package by ID.
 *     tags:
 *       - Learning Packages
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Package ID.
 *     responses:
 *       200:
 *         description: A learning package.
 *       404:
 *         description: Package not found.
 *       500:
 *         description: Server error.
 */
router.get('/api/package/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const learningPackage = yield LearningPackage_1.default.findByPk(id);
        if (learningPackage) {
            res.json(learningPackage);
        }
        else {
            res.status(404).json({ error: 'Learning package not found.' });
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to fetch learning package.', error: err });
    }
}));
// Create a new learning package
/**
 * @swagger
 * /api/package:
 *   post:
 *     summary: Create a new learning package.
 *     tags:
 *       - Learning Packages
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               targetAudience:
 *                 type: string
 *               difficultyLevel:
 *                 type: string
 *     responses:
 *       201:
 *         description: Learning package created.
 *       500:
 *         description: Server error.
 */
router.post('/api/package/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, category, targetAudience, difficultyLevel } = req.body;
    try {
        const newPackage = yield LearningPackage_1.default.create({ name, description, category, targetAudience, difficultyLevel });
        res.status(201).json(newPackage);
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to create learning package.', error: err });
    }
}));
// Update a learning package by ID
/**
 * @swagger
 * /api/package/{id}:
 *   put:
 *     summary: Update a learning package by ID.
 *     tags:
 *       - Learning Packages
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Package ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               targetAudience:
 *                 type: string
 *               difficultyLevel:
 *                 type: string
 *     responses:
 *       200:
 *         description: Learning package updated.
 *       404:
 *         description: Package not found.
 *       500:
 *         description: Server error.
 */
router.put('/api/package/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, description, category, targetAudience, difficultyLevel } = req.body;
    try {
        const updated = yield LearningPackage_1.default.update({ name, description, category, targetAudience, difficultyLevel }, { where: { id } });
        if (updated[0] > 0) {
            res.json({ message: 'Learning package updated successfully.' });
        }
        else {
            res.status(404).json({ error: 'Learning package not found.' });
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to update learning package.', error: err });
    }
}));
// Delete a learning package by ID
/**
 * @swagger
 * /api/package/{id}:
 *   delete:
 *     summary: Delete a learning package by ID.
 *     tags:
 *       - Learning Packages
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Package ID.
 *     responses:
 *       200:
 *         description: Learning package deleted.
 *       404:
 *         description: Package not found.
 *       500:
 *         description: Server error.
 */
router.delete('/api/package/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deleted = yield LearningPackage_1.default.destroy({ where: { id } });
        if (deleted) {
            res.json({ message: 'Learning package deleted successfully.' });
        }
        else {
            res.status(404).json({ error: 'Learning package not found.' });
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to delete learning package.', error: err });
    }
}));
exports.default = router;
