import { api } from './api';
import type { Product, CreateProductDto, UpdateProductDto } from '@/types/product';

export const productService = {
    getAll: async () => {
        const { data } = await api.get<Product[]>('/products');
        return data;
    },

    getById: async (id: number) => {
        const { data } = await api.get<Product>(`/products/${id}`);
        return data;
    },

    create: async (product: CreateProductDto) => {
        const { data } = await api.post<Product>('/products', product);
        return data;
    },

    update: async (id: number, product: UpdateProductDto) => {
        const { data } = await api.put<Product>(`/products/${id}`, product);
        return data;
    },

    delete: async (id: number) => {
        await api.delete(`/products/${id}`);
    },
};