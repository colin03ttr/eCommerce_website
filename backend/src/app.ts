import express from 'express';
import sequelize from './sequelize';
import learningPackagesRoutes from './routes/learningPackage';
import learningFactsRoutes from './routes/learningFact';
import userRoutes from './routes/user';
import watchRoutes from './routes/watch';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const PORT = 3000;

const app = express();
app.use(express.json());


const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Learning API',
            version: '1.0.0',
            description:
                'This is a simple CRUD API application made with Express and documented with Swagger',
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
            },
        ],
    },
    apis: ['./src/app.ts', './src/routes/*.ts'],
}

const specs = swaggerJSDoc(options);
//console.log(specs);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });
// Use the routes
app.use(learningPackagesRoutes);
app.use(learningFactsRoutes);
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
