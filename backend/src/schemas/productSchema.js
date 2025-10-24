import { z } from 'zod';

export const createProductSchema = z.object({
    name: z.string().min(1, 'El nombre es requerido'),
    unitPrice: z.number().positive('El precio debe ser mayor a 0'),
});

export const updateProductSchema = z.object({
    name: z.string().min(1, 'El nombre es requerido').optional(),
    unitPrice: z.number().positive('El precio debe ser mayor a 0').optional(),
});

export const productIdSchema = z.object({
    id: z.string().regex(/^\d+$/, 'ID inválido'),
});