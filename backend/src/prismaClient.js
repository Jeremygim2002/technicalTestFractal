import { PrismaClient } from '@prisma/client';
import { logger } from './utils/logger.js';

const prisma = new PrismaClient();

prisma.$connect()
    .then(() => logger.info('✅ Prisma conectado'))
    .catch((error) => {
        logger.error('Error conectando Prisma:', error);
        process.exit(1);
    });

export default prisma;
