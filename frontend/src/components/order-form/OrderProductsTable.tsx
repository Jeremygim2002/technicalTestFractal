import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import type { OrderFormProduct } from '@/types/order';

interface OrderProductsTableProps {
    products: OrderFormProduct[];
    onEdit: (product: OrderFormProduct) => void;
    onRemove: (product: OrderFormProduct) => void;
}

export function OrderProductsTable({
    products,
    onEdit,
    onRemove,
}: OrderProductsTableProps) {
    const formatPrice = (price: number) => {
        return `S/. ${price.toFixed(2)}`;
    };

    return (
        <div className="border rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Precio Unitario</TableHead>
                        <TableHead>Cantidad</TableHead>
                        <TableHead>Precio Total</TableHead>
                        <TableHead className="text-right">Opciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center text-gray-500">
                                No hay productos agregados
                            </TableCell>
                        </TableRow>
                    ) : (
                        products.map((op) => (
                            <TableRow key={op.productId}>
                                <TableCell>{op.product.id}</TableCell>
                                <TableCell className="font-medium">{op.product.name}</TableCell>
                                <TableCell>{formatPrice(op.product.unitPrice)}</TableCell>
                                <TableCell>{op.quantity}</TableCell>
                                <TableCell>{formatPrice(op.totalPrice)}</TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => onEdit(op)}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => onRemove(op)}
                                    >
                                        Eliminar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}