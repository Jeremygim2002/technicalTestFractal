import express from 'express';
import { corsMiddleware } from './middlewares/cors.js';
import compression from 'compression';

export const createApp = () => {
    const app = express();
    
    app.disable('x-powered-by');
    app.use(corsMiddleware);
    
    app.use(compression());
    app.use(express.json());

    return app;
}