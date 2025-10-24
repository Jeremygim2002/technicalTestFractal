import { api } from './api';
import type { Order, CreateOrderDto, UpdateOrderDto } from '@/types/order';

export const orderService = {
    getAll: async () => {
        const { data } = await api.get<Order[]>('/orders');
        return data.map((o) => ({
            ...o,
            finalPrice: Number(o.finalPrice),
            orderProducts: o.orderProducts.map((op) => ({
                ...op,
                totalPrice: Number(op.totalPrice),
                product: { ...op.product, unitPrice: Number(op.product.unitPrice) },
            })),
        }));
    },

    getById: async (id: number) => {
        const { data } = await api.get<Order>(`/orders/${id}`);
        return {
            ...data,
            finalPrice: Number(data.finalPrice),
            orderProducts: data.orderProducts.map((op) => ({
                ...op,
                totalPrice: Number(op.totalPrice),
                product: { ...op.product, unitPrice: Number(op.product.unitPrice) },
            })),
        };
    },

    create: async (order: CreateOrderDto) => {
        const { data } = await api.post<Order>('/orders', order);
        return data;
    },

    update: async (id: number, order: UpdateOrderDto) => {
        const { data } = await api.put<Order>(`/orders/${id}`, order);
        return data;
    },

    delete: async (id: number) => {
        await api.delete(`/orders/${id}`);
    },
};