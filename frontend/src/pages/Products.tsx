import { useProducts } from '@/hooks/useProducts';
import { useProductCRUD } from '@/hooks/useProductCRUD';
import { ProductTable } from '@/components/products/ProductTable';
import { ProductDialog } from '@/components/products/ProductDialog';
import { Button } from '@/components/ui/button';

export default function Products() {
    const { products, loading, refetch } = useProducts();
    const {
        dialogOpen,
        editingProduct,
        isSubmitting,
        openCreateDialog,
        openEditDialog,
        closeDialog,
        handleSubmit,
        handleDelete,
    } = useProductCRUD(refetch);

    if (loading) {
        return (
            <div className="container mx-auto py-10">
                <p className="text-center">Cargando productos...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Productos</h1>
                <Button onClick={openCreateDialog}>
                    Nuevo Producto
                </Button>
            </div>

            <ProductTable
                products={products}
                onEdit={openEditDialog}
                onDelete={handleDelete}
            />

            <ProductDialog
                open={dialogOpen}
                onOpenChange={closeDialog}
                product={editingProduct}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
            />
        </div>
    );
}