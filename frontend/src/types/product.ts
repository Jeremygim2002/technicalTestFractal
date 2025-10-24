export interface Product {
    id: number;
    name: string;
    unitPrice: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateProductDto {
    name: string;
    unitPrice: number;
}

export interface UpdateProductDto {
    name?: string;
    unitPrice?: number;
}