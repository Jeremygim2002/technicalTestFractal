import { DataTable, type Column } from '@/components/ui/DataTable';
import { formatPrice } from '@/lib/helpers';
import type { Product } from '@/types/product';

interface ProductTableProps {
    products: Product[];
    onEdit: (product: Product) => void;
    onDelete: (product: Product) => void;
}

export function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
    const columns: Column<Product>[] = [
        { key: 'id', header: 'ID' },
        { key: 'name', header: 'Nombre', className: 'font-medium' },
        { 
            key: 'unitPrice', 
            header: 'Precio Unitario',
            render: (product) => formatPrice(product.unitPrice)
        },
    ];

    return (
        <DataTable
            data={products}
            columns={columns}
            onEdit={onEdit}
            onDelete={onDelete}
            emptyMessage="No hay productos registrados"
        />
    );
}