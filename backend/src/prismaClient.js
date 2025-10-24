import { PrismaClient } from '@prisma/client';
import { logger } from './utils/logger.js';

const prisma = new PrismaClient();

prisma.$connect()
    .then(() => logger.info('Prisma connected'))
    .catch((err) => logger.error({ err }, 'Prisma connection error'));

export default prisma;
