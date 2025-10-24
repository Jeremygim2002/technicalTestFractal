import type { Product } from './product';

export type OrderStatus = 'Pending' | 'InProgress' | 'Completed';

export interface OrderProduct {
    id: number;
    orderId: number;
    productId: number;
    quantity: number;
    totalPrice: number;
    product: Product;
}

export interface Order {
    id: number;
    orderNumber: string;
    totalProducts: number;
    finalPrice: number;
    status: OrderStatus;
    createdAt: string;
    updatedAt: string;
    orderProducts: OrderProduct[];
}

export interface CreateOrderDto {
    orderNumber: string;
    products: {
        productId: number;
        quantity: number;
    }[];
}

export interface UpdateOrderDto {
    orderNumber?: string;
    status?: OrderStatus;
    products?: {
        productId: number;
        quantity: number;
    }[];
}

export interface OrderFormProduct {
    productId: number;
    product: Product;
    quantity: number;
    totalPrice: number;
}