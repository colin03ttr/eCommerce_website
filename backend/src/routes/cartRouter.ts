import { Router } from 'express';
import { Request, Response } from 'express';
import { Cart } from '../models/cart';
import { CartItem } from '../models/cartItem';
import Watch from '../models/watch';
import { authenticateToken } from './auth';

const cartRouter = Router();

declare global {
    namespace Express {
        interface Request {
            user?: { id: number }; // Adaptez selon la structure de votre `user`
        }
    }
}

// Exemple de route pour récupérer les articles du panier
cartRouter.get('/cart', authenticateToken, async (req: Request, res: Response): Promise<void> => {
    try {
        const cart = await Cart.findOne({ where: { userId: req.user?.id } });
        if (!cart) {
            res.json({ items: [] }); // Si le panier est vide
            return; // Arrêtez l'exécution après avoir répondu
        }

        const items = await CartItem.findAll({
            where: { cartId: cart.id },
            include: [Watch],
        });

        res.json({ items }); // Répond avec les articles du panier
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching the cart.' });
    }
});


export default cartRouter; // Assurez-vous que cette ligne est bien présente
