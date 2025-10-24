import prisma from '../prismaClient.js';
import { logger } from '../utils/logger.js';

export class OrderModel {
    static async findAll() {
        try {
            return await prisma.order.findMany({
                include: {
                    orderProducts: {
                        include: { product: true },
                    },
                },
                orderBy: { id: 'asc' },
            });
        } catch (err) {
            logger.error({ msg: 'Error en', error: err });
            throw err;
        }
    }

    static async findById(id) {
        try {
            return await prisma.order.findUnique({
                where: { id: Number(id) },
                include: {
                    orderProducts: {
                        include: { product: true },
                    },
                },
            });
        } catch (err) {
            logger.error({ msg: 'Error en', error: err });
            throw err;
        }
    }

    static async createOrder(data) {
        const { orderNumber, products } = data;
        try {
            return await prisma.$transaction(async (tx) => {
                const productIds = products.map((p) => p.productId);
                const dbProducts = await tx.product.findMany({
                    where: { id: { in: productIds } },
                });

                let totalProducts = 0;
                let finalPrice = 0;
                const orderProductsData = [];

                for (const p of products) {
                    const prod = dbProducts.find((x) => x.id === p.productId);
                    const totalPrice = prod.unitPrice * p.quantity;
                    totalProducts += p.quantity;
                    finalPrice += totalPrice;

                    orderProductsData.push({
                        productId: p.productId,
                        quantity: p.quantity,
                        totalPrice,
                    });
                }

                const order = await tx.order.create({
                    data: {
                        orderNumber,
                        totalProducts,
                        finalPrice,
                        orderProducts: { create: orderProductsData },
                    },
                    include: { orderProducts: { include: { product: true } } },
                });

                return order;
            });
        } catch (err) {
            logger.error({ msg: 'Error en', error: err });
            throw err;
        }
    }

    static async updateOrder(id, data) {
        const { orderNumber, products, status } = data;
        try {
            return await prisma.$transaction(async (tx) => {
                let updateData = { orderNumber, status };

                if (products) {
                    await tx.orderProduct.deleteMany({
                        where: { orderId: Number(id) }
                    });

                    const productIds = products.map((p) => p.productId);
                    const dbProducts = await tx.product.findMany({
                        where: { id: { in: productIds } },
                    });

                    let totalProducts = 0;
                    let finalPrice = 0;

                    for (const p of products) {
                        const prod = dbProducts.find((x) => x.id === p.productId);
                        const totalPrice = prod.unitPrice * p.quantity;
                        totalProducts += p.quantity;
                        finalPrice += totalPrice;
                    }

                    await tx.orderProduct.createMany({
                        data: products.map((p) => {
                            const prod = dbProducts.find((x) => x.id === p.productId);
                            return {
                                orderId: Number(id),
                                productId: p.productId,
                                quantity: p.quantity,
                                totalPrice: prod.unitPrice * p.quantity,
                            };
                        }),
                    });

                    updateData.totalProducts = totalProducts;
                    updateData.finalPrice = finalPrice;
                }

                return await tx.order.update({
                    where: { id: Number(id) },
                    data: updateData,
                    include: { orderProducts: { include: { product: true } } },
                });
            });
        } catch (err) {
            logger.error({ msg: 'Error en', error: err });
            throw err;
        }
    }

    static async deleteOrder(id) {
        try {
            await prisma.order.delete({ where: { id: Number(id) } });
            return { message: 'Orden eliminada' };
        } catch (err) {
            logger.error({ msg: 'Error en', error: err });
            throw err;
        }
    }
}