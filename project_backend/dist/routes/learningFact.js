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
const learningFact_1 = __importDefault(require("../models/learningFact")); // Assuming you have a LearningFact model
const router = (0, express_1.Router)();
// GET /api/package/:id/fact
/**
 * @swagger
 * /api/package/{id}/fact:
 *   get:
 *     summary: Get learning facts by package ID.
 *     tags:
 *       - Learning Facts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Package ID.
 *     responses:
 *       200:
 *         description: Success.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Server error.
 */
router.get('/api/package/:id/fact', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const packageId = req.params.id;
        const learningFacts = yield learningFact_1.default.findAll({ where: { packageId } });
        res.status(200).json(learningFacts);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching learning facts', error });
    }
}));
// POST /api/package/:id/fact
/**
 * @swagger
 * /api/package/{id}/fact:
 *   post:
 *     summary: Create a new learning fact for a package.
 *     tags:
 *       - Learning Facts
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
 *     responses:
 *       201:
 *         description: Learning fact created.
 *       500:
 *         description: Server error.
 */
router.post('/api/package/:id/fact', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const packageId = req.params.id;
        const newFact = new learningFact_1.default(Object.assign(Object.assign({}, req.body), { packageId }));
        yield newFact.save();
        res.status(201).json(newFact);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating learning fact', error });
    }
}));
// PUT /api/package/:id/fact
/**
 * @swagger
 * /api/package/{id}/fact:
 *   put:
 *     summary: Update a learning fact for a package.
 *     tags:
 *       - Learning Facts
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
 *     responses:
 *       200:
 *         description: Learning fact updated.
 *       500:
 *         description: Server error.
 */
router.put('/api/package/:id/fact', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const packageId = req.params.id;
        const factId = req.body.id;
        const updatedFact = yield learningFact_1.default.update(req.body, { where: { id: factId }, returning: true });
        res.status(200).json(updatedFact);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating learning fact', error });
    }
}));
// DELETE /api/package/:id/fact
/**
 * @swagger
 * /api/package/{id}/fact:
 *   delete:
 *     summary: Delete a learning fact for a package.
 *     tags:
 *       - Learning Facts
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
 *               id:
 *                 type: string
 *                 description: ID of the fact to delete.
 *     responses:
 *       200:
 *         description: Learning fact deleted.
 *       404:
 *         description: Learning fact not found.
 *       500:
 *         description: Server error.
 */
router.delete('/api/package/:id/fact', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const factId = req.body.id;
        const deletedFact = yield learningFact_1.default.destroy({ where: { id: factId } });
        if (deletedFact) {
            res.status(200).json({ message: 'Learning fact deleted successfully' });
        }
        else {
            res.status(404).json({ message: 'Learning fact not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting learning fact', error });
    }
}));
exports.default = router;
