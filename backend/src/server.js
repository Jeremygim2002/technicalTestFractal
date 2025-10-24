import dotenv from 'dotenv';
dotenv.config();

import { logger } from './utils/logger.js';
import { createApp } from './createApp.js';
import { ProductModel } from './models/productModel.js';
import { OrderModel } from './models/ordenModel.js';


const PORT = Number(process.env.PORT) || 5001;

const app = createApp({ 
    productModel: ProductModel,
    orderModel: OrderModel 
});

app.listen(PORT, () => {
    logger.info(`Servidor corriendo en http://localhost:${PORT}`);
});