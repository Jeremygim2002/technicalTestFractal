import { api } from './api';
import type { Product, CreateProductDto, UpdateProductDto } from '@/types/product';

export const productService = {
    getAll: async () => {
        const { data } = await api.get<Product[]>('/products');
        return data.map(p => ({ ...p, unitPrice: Number(p.unitPrice) }));
    },

    getById: async (id: number) => {
        const { data } = await api.get<Product>(`/products/${id}`);
        return { ...data, unitPrice: Number(data.unitPrice) };
    },

    create: async (product: CreateProductDto) => {
        // Ensure numeric unitPrice when sending
        const payload = { ...product, unitPrice: Number(product.unitPrice) };
        const { data } = await api.post<Product>('/products', payload);
        return { ...data, unitPrice: Number(data.unitPrice) };
    },

    update: async (id: number, product: UpdateProductDto) => {
        const payload: UpdateProductDto = { ...product };
        if (payload.unitPrice !== undefined) payload.unitPrice = Number(payload.unitPrice);

        const { data } = await api.put<Product>(`/products/${id}`, payload);
        return { ...data, unitPrice: Number(data.unitPrice) };
    },

    delete: async (id: number) => {
        await api.delete(`/products/${id}`);
    },
};