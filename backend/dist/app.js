"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};

Object.defineProperty(exports, "__esModule", { value: true });

const express_1 = __importDefault(require("express"));
const sequelize_1 = __importDefault(require("./sequelize")); // Configuration Sequelize
const user_1 = __importDefault(require("./routes/user")); // Routes utilisateur
const watch_1 = __importDefault(require("./routes/watch")); // Routes montre
const auth_1 = __importDefault(require("./routes/auth")); // Routes authentification
const cartRouter_1 = __importDefault(require("./routes/cartRouter")); // Routes panier
const orderRouter_1 = __importDefault(require("./routes/orderRouter")); // Routes commande
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));

const PORT = 3000;
const app = (0, express_1.default)();

// Middleware pour parser le JSON
app.use(express_1.default.json());

// Configuration de Swagger
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'E-Commerce API',
            version: '1.0.0',
            description: 'API pour la gestion d\'un site e-commerce avec des utilisateurs, des montres, des paniers et des commandes.',
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
    apis: ['./src/routes/*.ts', './src/routes/*.js'], // Assurez-vous que les annotations OpenAPI existent dans vos fichiers
};

const specs = (0, swagger_jsdoc_1.default)(options);

// Activer Swagger UI pour la documentation de l'API
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));

// Endpoint pour récupérer le fichier Swagger en JSON
app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
});

// Montage des routes
app.use("/api/users", user_1.default); // Routes utilisateur
app.use("/api/watches", watch_1.default); // Routes montre
app.use("/api/auth", auth_1.default); // Routes authentification
app.use("/api/cart", cartRouter_1.default); // Routes panier
app.use("/api/orders", orderRouter_1.default); // Routes commande

/**
 * @openapi
 * /api/liveliness:
 *  get:
 *    summary: Vérifie si le serveur est opérationnel
 *    tags:
 *      - monitor
 *    responses:
 *      200:
 *        description: Le serveur est opérationnel
 */
app.get('/api/liveness', (req, res) => {
    res.status(200).send('Server is operational!');
});

// Synchronisation avec la base de données et démarrage du serveur
sequelize_1.default.sync({ alter: true }) // Utilisez { force: true } uniquement si vous voulez réinitialiser les tables
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Failed to connect to the database:", err);
    });

module.exports = app;
