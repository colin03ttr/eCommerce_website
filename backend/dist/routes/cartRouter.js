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
const cart_1 = require("../models/cart");
const cartItem_1 = require("../models/cartItem");
const watch_1 = __importDefault(require("../models/watch"));
const auth_1 = require("./auth");
const cartRouter = (0, express_1.Router)();
// Exemple de route pour récupérer les articles du panier
cartRouter.get('/cart', auth_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const cart = yield cart_1.Cart.findOne({ where: { userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id } });
        if (!cart) {
            res.json({ items: [] }); // Si le panier est vide
            return; // Arrêtez l'exécution après avoir répondu
        }
        const items = yield cartItem_1.CartItem.findAll({
            where: { cartId: cart.id },
            include: [watch_1.default],
        });
        res.json({ items }); // Répond avec les articles du panier
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching the cart.' });
    }
}));
exports.default = cartRouter; // Assurez-vous que cette ligne est bien présente
