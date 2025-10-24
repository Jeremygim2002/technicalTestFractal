import { z } from 'zod';
export const orderProductSchema = z.object({
    productId: z.number().int().positive(),
    quantity: z.number().int().positive('La cantidad debe ser mayor a 0'),
});

export const createOrderSchema = z.object({
    orderNumber: z.string().min(1, 'El número de orden es requerido'),
    products: z.array(orderProductSchema).min(1, 'Debe incluir al menos un producto'),
});

export const updateOrderSchema = z.object({
    orderNumber: z.string().min(1, 'El número de orden es requerido').optional(),
    status: z.enum(['Pending', 'InProgress', 'Completed']).optional(),
    products: z.array(orderProductSchema).optional(),
});

export const orderIdSchema = z.object({
    id: z.string().regex(/^\d+$/, 'ID inválido'),
});