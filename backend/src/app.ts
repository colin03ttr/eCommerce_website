import express from 'express';
import sequelize from './sequelize';
import userRoutes from './routes/user';
import watchRoutes from './routes/watch';
import authRoutes from './routes/auth';
import cartRoutes from './routes/cart';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import orderRoutes from './routes/order';

import cart from './routes/cart';
import Cart from './models/cart';
const PORT = 3000;

const app = express();
app.use(express.json());



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
    apis: ['./src/app.ts','./src/routes/auth.ts', './src/routes/user.ts', './src/routes/watch.ts','./src/routes/order.ts','./src/routes/cart.ts'],
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
app.use(authRoutes);
app.use(cartRoutes);
app.use(orderRoutes);


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
