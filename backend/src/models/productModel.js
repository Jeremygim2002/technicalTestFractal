import prisma from '../prismaClient.js';
import { logger } from '../utils/logger.js';

export class ProductModel {
    static async findAll() {
        try {
            return await prisma.product.findMany({
                orderBy: { id: 'asc' },
            });
        } catch (err) {
            logger.error({ msg: 'Error en ProductModel.findAll', error: err });
            throw err;
        }
    }

    static async findById(id) {
        try {
            return await prisma.product.findUnique({ where: { id: Number(id) } });
        } catch (err) {
            logger.error({ msg: 'Error en ProductModel.findById', error: err });
            throw err;
        }
    }

    static async create(data) {
        try {
            return await prisma.product.create({ data });
        } catch (err) {
            logger.error({ msg: 'Error en ProductModel.create', error: err });
            throw err;
        }
    }

    static async update(id, data) {
        try {
            return await prisma.product.update({
                where: { id: Number(id) },
                data,
            });
        } catch (err) {
            logger.error({ msg: 'Error en ProductModel.update', error: err });
            throw err;
        }
    }

    static async delete(id) {
        try {
            return await prisma.product.delete({ where: { id: Number(id) } });
        } catch (err) {
            logger.error({ msg: 'Error en ProductModel.delete', error: err });
            throw err;
        }
    }
}
