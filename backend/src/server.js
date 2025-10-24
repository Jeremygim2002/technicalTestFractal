import dotenv from 'dotenv';
dotenv.config();

import { logger } from './utils/logger.js';
import { createApp } from './createApp.js';
import { ProductModel } from './models/productModel.js';
import { OrderModel } from './models/ordenModel.js';

// Función para inicializar la aplicación
async function startServer() {
    try {
        logger.info('Iniciando servidor...');
        logger.info('Variables de entorno:', {
            NODE_ENV: process.env.NODE_ENV,
            PORT: process.env.PORT,
            DATABASE_URL: process.env.DATABASE_URL ? 'configurada' : 'NO configurada',
            DIRECT_URL: process.env.DIRECT_URL ? 'configurada' : 'NO configurada'
        });

        const PORT = Number(process.env.PORT) || 5000;

        const app = createApp({ 
            productModel: ProductModel,
            orderModel: OrderModel 
        });

        // Iniciar servidor
        app.listen(PORT, '0.0.0.0', () => {
            logger.info(`✅ Servidor corriendo exitosamente en puerto ${PORT}`);
            logger.info(`🌐 Servidor disponible en http://0.0.0.0:${PORT}`);
        });

    } catch (error) {
        logger.error('❌ Error al iniciar el servidor:', error);
        process.exit(1);
    }
}

// Manejo de errores globales
process.on('uncaughtException', (error) => {
    logger.error('❌ Uncaught Exception:', error);
    process.exit(1);
});

process.on('unhandledRejection', (reason) => {
    logger.error('❌ Unhandled Rejection:', reason);
    process.exit(1);
});

process.on('SIGTERM', () => {
    logger.info('👋 SIGTERM recibido, cerrando servidor...');
    process.exit(0);
});

process.on('SIGINT', () => {
    logger.info('👋 SIGINT recibido, cerrando servidor...');
    process.exit(0);
});

// Iniciar el servidor
startServer();