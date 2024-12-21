import express, {Request,Response,NextFunction} from 'express';
import sequelize from './sequelize';
import userRoutes from './routes/user';
import watchRoutes from './routes/watch';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from './models/user';

const PORT = 3000;

const app = express();
app.use(express.json());



// Middleware
app.use(bodyParser.json());

// Clé secrète pour JWT
const JWT_SECRET = '71c08c0e94e1fb75b31733d23416714071e039664965176b85880f8925abf662'; 
const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Learning API',
        version: '1.0.0',
        description: 'This is a simple CRUD API application made with Express and documented with Swagger',
      },
      servers: [
        {
          url: `http://localhost:${PORT}`,
        },
      ],
      components: {
        securitySchemes: {
          BearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
    },
    apis: ['./src/app.ts', './src/routes/*.ts'],
  };

const specs = swaggerJSDoc(options);
//console.log(specs);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });
// Use the routes
app.use(userRoutes);
app.use(watchRoutes);


/**
 * @openapi
 * /api/liveliness:
 *  get:
 *    summary: liveliness
 *    tags:
 *      - monitor
 *    responses:
 *      200:
 *        description: Server is operational! if the server alive
 */
app.get('/api/liveness', (req, res) => {
    res.status(200).send('Server is operational!');

});
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
 *               name:
 *                 type: string
 *                 example: test
 *               email:
 *                 type: string
 *                 example: test@test.test
 *               password:
 *                 type: string
 *                 example: test
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
app.post('/api/login-page', async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            res.status(400).json({ error: 'Email and password are required.' });
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
                discount: user.discount
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
app.get('/api/profile', authenticateToken, async (req: any, res: Response) => {
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
            discount: user.discount
        });
    } catch (err) {
        console.error('Error fetching profile:', err);
        res.status(500).json({ error: 'An error occurred while fetching the profile.' });
    }
});
function authenticateToken(req: Request, res: Response, next: NextFunction): void {
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




// Start server
sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to database:', err);
    });
