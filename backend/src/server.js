import dotenv from 'dotenv';
dotenv.config();

import { logger } from './utils/logger.js';
import { createApp } from './createApp.js';
import { ProductModel } from './models/productModel.js';
import { OrderModel } from './models/ordenModel.js';

async function startServer() {
    try {
        const PORT = Number(process.env.PORT) || 8080;

        const app = createApp({ 
            productModel: ProductModel,
            orderModel: OrderModel 
        });

        app.listen(PORT, '0.0.0.0', () => {
            logger.info(`Servidor corriendo en puerto ${PORT}`);
        });

    } catch (error) {
        logger.error('Error al iniciar el servidor:', error);
        process.exit(1);
    }
}

process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception:', error);
    process.exit(1);
});

process.on('unhandledRejection', (reason) => {
    logger.error('Unhandled Rejection:', reason);
    process.exit(1);
});

startServer();