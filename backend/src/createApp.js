import express from 'express';
import { corsMiddleware } from './middlewares/cors.js';
import compression from 'compression';
import { errorHandler } from './middlewares/errorHandler.js';

import { createProductRoutes } from './routes/productRoutes.js';
import { createOrderRoutes } from './routes/ordenRoutes.js';

export const createApp = ({ productModel, orderModel } = {}) => {
    const app = express();

    app.disable('x-powered-by');
    app.use(corsMiddleware);

    app.use(compression());
    app.use(express.json());

    app.use('/api/products', createProductRoutes({ productModel }));
    app.use('/api/orders', createOrderRoutes({ orderModel }));

    app.use((req, res, next) => {
        res.status(404).json({ error: 'Ruta no encontrada' });
    });

    app.use(errorHandler);
    return app;
}