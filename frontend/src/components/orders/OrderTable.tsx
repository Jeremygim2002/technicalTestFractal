import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import type { Order, OrderStatus } from '@/types/order';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface OrderTableProps {
    orders: Order[];
    onEdit: (id: number) => void;
    onDelete: (order: Order) => void;
    onStatusChange: (orderId: number, status: OrderStatus) => void;
}

export function OrderTable({ orders, onEdit, onDelete, onStatusChange }: OrderTableProps) {
    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('es-PE', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
    };

    const formatPrice = (price: number) => {
        return `S/. ${price.toFixed(2)}`;
    };

    return (
        <div className="border rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Orden</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Productos</TableHead>
                        <TableHead>Precio Final</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Opciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center text-gray-500">
                                No hay órdenes registradas
                            </TableCell>
                        </TableRow>
                    ) : (
                        orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell className="font-medium">{order.orderNumber}</TableCell>
                                <TableCell>{formatDate(order.createdAt)}</TableCell>
                                <TableCell>{order.totalProducts}</TableCell>
                                <TableCell>{formatPrice(order.finalPrice)}</TableCell>
                                <TableCell>
                                    <Select
                                        value={order.status}
                                        onValueChange={(value) => onStatusChange(order.id, value as OrderStatus)}
                                        disabled={order.status === 'Completed'}
                                    >
                                        <SelectTrigger className="w-[140px]">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Pending">Pendiente</SelectItem>
                                            <SelectItem value="InProgress">En Progreso</SelectItem>
                                            <SelectItem value="Completed">Completado</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => onEdit(order.id)}
                                        disabled={order.status === 'Completed'}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => onDelete(order)}
                                        disabled={order.status === 'Completed'}
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