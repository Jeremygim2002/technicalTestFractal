import { useState } from 'react';
import { productService } from '@/services/productService';
import { showAlert, showConfirm } from '@/lib/helpers';
import type { Product, CreateProductDto, UpdateProductDto } from '@/types/product';

export const useProductCRUD = (refetch: () => Promise<void>) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCreate = async (data: CreateProductDto) => {
        try {
            setIsSubmitting(true);
            await productService.create(data);
            await refetch();
            setDialogOpen(false);
        } catch (error) {
            console.error('Error creating product:', error);
            showAlert('Error al crear el producto');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleUpdate = async (id: number, data: UpdateProductDto) => {
        try {
            setIsSubmitting(true);
            await productService.update(id, data);
            await refetch();
            setEditingProduct(null);
        } catch (error) {
            console.error('Error updating product:', error);
            showAlert('Error al actualizar el producto');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (product: Product) => {
        if (!showConfirm(`¿Eliminar ${product.name}? Esta acción no se puede deshacer.`)) {
            return;
        }

        try {
            await productService.delete(product.id);
            await refetch();
        } catch (error) {
            console.error('Error deleting product:', error);
            showAlert('Error al eliminar el producto');
        }
    };

    const openCreateDialog = () => setDialogOpen(true);
    const openEditDialog = (product: Product) => setEditingProduct(product);
    
    const closeDialog = () => {
        setDialogOpen(false);
        setEditingProduct(null);
    };

    const handleSubmit = (data: CreateProductDto) => {
        if (editingProduct) {
            handleUpdate(editingProduct.id, data);
        } else {
            handleCreate(data);
        }
    };

    return {
        dialogOpen: dialogOpen || !!editingProduct,
        editingProduct,
        isSubmitting,
        openCreateDialog,
        openEditDialog,
        closeDialog,
        handleSubmit,
        handleDelete,
    };
};