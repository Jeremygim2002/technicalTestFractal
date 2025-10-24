import { PrismaClient } from '@prisma/client';
import { logger } from './utils/logger.js';

const prisma = new PrismaClient({
    log: ['error', 'warn'],
    errorFormat: 'pretty',
});

async function connectWithRetry(retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            await prisma.$connect();
            logger.info('✅ Prisma conectado exitosamente');
            return;
        } catch (error) {
            logger.error(`❌ Error al conectar Prisma (intento ${i + 1}/${retries}):`, error.message);
            if (i === retries - 1) {
                throw error;
            }
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
}


connectWithRetry().catch((error) => {
    logger.error('❌ Error fatal de conexión Prisma:', error);
    process.exit(1);
});

process.on('beforeExit', async () => {
    await prisma.$disconnect();
    logger.info('👋 Prisma desconectado');
});

export default prisma;
