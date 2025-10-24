import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

export interface Column<T> {
    key: keyof T | string;
    header: string;
    render?: (item: T) => React.ReactNode;
    className?: string;
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
    emptyMessage?: string;
}

export function DataTable<T extends { id: number | string }>({
    data,
    columns,
    onEdit,
    onDelete,
    emptyMessage = "No hay datos disponibles"
}: DataTableProps<T>) {
    const renderCellValue = (item: T, column: Column<T>) => {
        if (column.render) {
            return column.render(item);
        }
        
        const value = column.key === 'id' ? item.id : item[column.key as keyof T];
        return value?.toString() || '';
    };

    return (
        <div className="border rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                        {columns.map((column) => (
                            <TableHead key={column.key.toString()} className={column.className}>
                                {column.header}
                            </TableHead>
                        ))}
                        {(onEdit || onDelete) && (
                            <TableHead className="text-right">Opciones</TableHead>
                        )}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length === 0 ? (
                        <TableRow>
                            <TableCell 
                                colSpan={columns.length + (onEdit || onDelete ? 1 : 0)} 
                                className="text-center text-gray-500"
                            >
                                {emptyMessage}
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((item) => (
                            <TableRow key={item.id}>
                                {columns.map((column) => (
                                    <TableCell key={column.key.toString()} className={column.className}>
                                        {renderCellValue(item, column)}
                                    </TableCell>
                                ))}
                                {(onEdit || onDelete) && (
                                    <TableCell className="text-right space-x-2">
                                        {onEdit && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => onEdit(item)}
                                            >
                                                Editar
                                            </Button>
                                        )}
                                        {onDelete && (
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => onDelete(item)}
                                            >
                                                Eliminar
                                            </Button>
                                        )}
                                    </TableCell>
                                )}
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}