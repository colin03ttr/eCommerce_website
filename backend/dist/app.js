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
const express_1 = __importDefault(require("express"));
const sequelize_1 = __importDefault(require("./sequelize"));
const learningPackage_1 = __importDefault(require("./routes/learningPackage"));
const learningFact_1 = __importDefault(require("./routes/learningFact"));
const user_1 = __importDefault(require("./routes/user"));
const watch_1 = __importDefault(require("./routes/watch"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const body_parser_1 = __importDefault(require("body-parser"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_2 = __importDefault(require("./models/user"));
const PORT = 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Middleware
app.use(body_parser_1.default.json());
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
const specs = (0, swagger_jsdoc_1.default)(options);
//console.log(specs);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
});
// Use the routes
app.use(learningPackage_1.default);
app.use(learningFact_1.default);
app.use(user_1.default);
app.use(watch_1.default);
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
app.post('/api/login-page', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            res.status(400).json({ error: 'Email and password are required.' });
            return;
        }
        const user = yield user_2.default.findOne({ where: { email } });
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
app.get('/api/profile', authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_2.default.findByPk(req.user.id);
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
// Start server
sequelize_1.default.sync()
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
})
    .catch((err) => {
    console.error('Failed to connect to database:', err);
});
