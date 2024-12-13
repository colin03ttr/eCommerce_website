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
const watch_1 = __importDefault(require("../models/watch"));
const router = (0, express_1.Router)();
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
router.get('/api/watches', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const watches = yield watch_1.default.findAll();
        res.json(watches);
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to fetch watches.\n', error: err });
    }
}));
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
router.get('/api/watches/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const watch = yield watch_1.default.findByPk(id);
        if (watch) {
            res.json(watch);
        }
        else {
            res.status(404).json({ error: 'Watch not found.' });
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to fetch watch.\n', error: err });
    }
}));
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
router.put('/api/watches/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, description, price, imageurl, brand } = req.body;
    try {
        const watch = yield watch_1.default.findByPk(id);
        if (watch) {
            watch.name = name;
            watch.description = description;
            watch.price = price;
            watch.imageurl = imageurl;
            watch.brand = brand;
            yield watch.save();
            res.json({ message: 'Watch updated successfully.' });
        }
        else {
            res.status(404).json({ error: 'Watch not found.' });
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to update watch.\n', error: err });
    }
}));
exports.default = router;
