"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sequelize_1 = __importDefault(require("./sequelize"));
const learningPackage_1 = __importDefault(require("./routes/learningPackage"));
const learningFact_1 = __importDefault(require("./routes/learningFact"));
const user_1 = __importDefault(require("./routes/user"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
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
