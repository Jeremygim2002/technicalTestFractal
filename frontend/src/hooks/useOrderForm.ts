import { useState, useEffect } from 'react';
import { orderService } from '@/services/orderService';
import { showAlert, validateRequired } from '@/lib/helpers';
import type { OrderFormProduct } from '@/types/order';

export const useOrderForm = (id?: string, navigate?: (path: string) => void) => {
    const [orderNumber, setOrderNumber] = useState('');
    const [orderProducts, setOrderProducts] = useState<OrderFormProduct[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingOrder, setIsLoadingOrder] = useState(false);
    
    const isEditMode = !!id;

    useEffect(() => {
        if (!id) return;

        const loadOrder = async () => {
            try {
                setIsLoadingOrder(true);
                const order = await orderService.getById(Number(id));
                setOrderNumber(order.orderNumber);
                
                const formProducts: OrderFormProduct[] = order.orderProducts.map((op) => ({
                    productId: op.productId,
                    product: op.product,
                    quantity: op.quantity,
                    totalPrice: op.totalPrice,
                }));
                
                setOrderProducts(formProducts);
            } catch (error) {
                console.error('Error loading order:', error);
                showAlert('Error al cargar la orden');
                navigate?.('/my-orders');
            } finally {
                setIsLoadingOrder(false);
            }
        };

        loadOrder();
    }, [id, navigate]);

    const addOrUpdateProduct = (productId: number, quantity: number, products: { id: number; unitPrice: number; name: string }[]) => {
        const product = products.find((p) => p.id === productId);
        if (!product) return;

        const totalPrice = product.unitPrice * quantity;
        const newProduct: OrderFormProduct = {
            productId,
            product,
            quantity,
            totalPrice,
        };

        const existingIndex = orderProducts.findIndex(op => op.productId === productId);
        
        if (existingIndex >= 0) {
            // Update existing
            setOrderProducts(prev => 
                prev.map((op, index) => 
                    index === existingIndex ? { ...op, quantity, totalPrice } : op
                )
            );
        } else {
            // Add new
            setOrderProducts(prev => [...prev, newProduct]);
        }
    };

    const removeProduct = (productId: number) => {
        setOrderProducts(prev => prev.filter(op => op.productId !== productId));
    };

    const submitOrder = async () => {
        try {
            validateRequired(orderNumber, 'El número de orden');
            
            if (orderProducts.length === 0) {
                throw new Error('Debes agregar al menos un producto');
            }

            setIsLoading(true);

            const orderData = {
                orderNumber,
                products: orderProducts.map(op => ({
                    productId: op.productId,
                    quantity: op.quantity,
                })),
            };

            if (isEditMode) {
                await orderService.update(Number(id), orderData);
            } else {
                await orderService.create(orderData);
            }

            navigate?.('/my-orders');
        } catch (error) {
            console.error('Error saving order:', error);
            showAlert(error instanceof Error ? error.message : 'Error al guardar la orden');
        } finally {
            setIsLoading(false);
        }
    };

    const totalProducts = orderProducts.reduce((sum, op) => sum + op.quantity, 0);
    const finalPrice = orderProducts.reduce((sum, op) => sum + op.totalPrice, 0);

    return {
        orderNumber,
        setOrderNumber,
        orderProducts,
        isLoading,
        isLoadingOrder,
        isEditMode,
        totalProducts,
        finalPrice,
        
        addOrUpdateProduct,
        removeProduct,
        submitOrder,
    };
};