"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sequelize_1 = __importDefault(require("./sequelize"));
const user_1 = __importDefault(require("./routes/user"));
const watch_1 = __importDefault(require("./routes/watch"));
const auth_1 = __importDefault(require("./routes/auth"));
const cart_1 = __importDefault(require("./routes/cart"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const order_1 = __importDefault(require("./routes/order"));
const PORT = 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
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
    apis: ['./src/app.ts', './src/routes/auth.ts', './src/routes/user.ts', './src/routes/watch.ts', './src/routes/order.ts', './src/routes/cart.ts'],
};
const specs = (0, swagger_jsdoc_1.default)(options);
//console.log(specs);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
});
// Use the routes
app.use(user_1.default);
app.use(watch_1.default);
app.use(auth_1.default);
app.use(cart_1.default);
app.use(order_1.default);
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
