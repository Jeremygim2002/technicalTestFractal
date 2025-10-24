import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import { useOrderForm } from '@/hooks/useOrderForm';
import { OrderForm } from '@/components/order-form/OrderForm';
import { OrderProductsTable } from '@/components/order-form/OrderProductsTable';
import { ProductDialog } from '@/components/order-form/ProductDialog';
import { Button } from '@/components/ui/button';
import { showConfirm } from '@/lib/helpers';
import type { OrderFormProduct } from '@/types/order';

export default function OrderFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { products } = useProducts();
    
    const {
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
    } = useOrderForm(id, navigate);

    // Dialog states 
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<OrderFormProduct | null>(null);

    const handleProductSubmit = (productId: number, quantity: number) => {
        addOrUpdateProduct(productId, quantity, products);
        setEditingProduct(null);
        setDialogOpen(false);
    };

    const handleEditClick = (product: OrderFormProduct) => {
        setEditingProduct(product);
        setDialogOpen(true);
    };

    const handleRemoveClick = (product: OrderFormProduct) => {
        if (showConfirm(`¿Eliminar ${product.product.name} del pedido?`)) {
            removeProduct(product.productId);
        }
    };

    if (isLoadingOrder) {
        return (
            <div className="container mx-auto py-10">
                <p className="text-center">Cargando orden...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-10 max-w-5xl">
            <h1 className="text-3xl font-bold mb-6">
                {isEditMode ? 'Editar Orden' : 'Agregar Orden'}
            </h1>

            <div className="space-y-6">
                <OrderForm
                    orderNumber={orderNumber}
                    onOrderNumberChange={setOrderNumber}
                    totalProducts={totalProducts}
                    finalPrice={finalPrice}
                />

                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Productos</h2>
                        <Button onClick={() => setDialogOpen(true)}>
                            Agregar Producto
                        </Button>
                    </div>

                    <OrderProductsTable
                        products={orderProducts}
                        onEdit={handleEditClick}
                        onRemove={handleRemoveClick}
                    />
                </div>

                <div className="flex gap-4">
                    <Button
                        onClick={submitOrder}
                        disabled={isLoading}
                        className="flex-1"
                    >
                        {isLoading ? 'Guardando...' : 'Guardar Orden'}
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => navigate('/my-orders')}
                        disabled={isLoading}
                    >
                        Cancelar
                    </Button>
                </div>
            </div>

            <ProductDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                products={products}
                existingProductIds={orderProducts.map((op) => op.productId)}
                editingProduct={editingProduct}
                onSubmit={handleProductSubmit}
            />
        </div>
    );
}