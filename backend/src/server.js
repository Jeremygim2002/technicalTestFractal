import dotenv from 'dotenv';
dotenv.config();

import { logger } from './utils/logger.js';
import { createApp } from './createApp.js';
import { ProductModel } from './models/productModel.js';
import { OrderModel } from './models/ordenModel.js';


const PORT = Number(process.env.PORT) || 5000;

const app = createApp({ 
    productModel: ProductModel,
    orderModel: OrderModel 
});

app.listen(PORT, '0.0.0.0', () => {
    logger.info(`Servidor corriendo en puerto ${PORT}`);
});

process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception:', error);
    process.exit(1);
});

process.on('unhandledRejection', (reason) => {
    logger.error('Unhandled Rejection:', reason);
    process.exit(1);
});