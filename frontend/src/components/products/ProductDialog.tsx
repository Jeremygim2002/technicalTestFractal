import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { validateRequired, validatePositiveNumber, showAlert } from '@/lib/helpers';
import type { Product, CreateProductDto } from '@/types/product';

interface ProductDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    product: Product | null;
    onSubmit: (data: CreateProductDto) => void;
    isSubmitting?: boolean;
}

export function ProductDialog({
    open,
    onOpenChange,
    product,
    onSubmit,
    isSubmitting,
}: ProductDialogProps) {
    const [name, setName] = useState('');
    const [unitPrice, setUnitPrice] = useState('');

    useEffect(() => {
        if (product) {
            setName(product.name);
            setUnitPrice(product.unitPrice.toString());
        } else {
            setName('');
            setUnitPrice('');
        }
    }, [product, open]);

    const handleSubmit = () => {
        try {
            const validName = validateRequired(name, 'El nombre');
            const validPrice = validatePositiveNumber(unitPrice, 'El precio');

            onSubmit({
                name: validName,
                unitPrice: validPrice,
            });
        } catch (error) {
            showAlert(error instanceof Error ? error.message : 'Error en validación');
        }
    };

    const handleClose = () => {
        setName('');
        setUnitPrice('');
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{product ? 'Editar Producto' : 'Nuevo Producto'}</DialogTitle>
                    <DialogDescription>
                        {product
                            ? 'Actualiza'
                            : 'Ingresa'}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div>
                        <Label htmlFor="name">Nombre</Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Product name"
                        />
                    </div>

                    <div>
                        <Label htmlFor="unitPrice">Precio Unitario</Label>
                        <Input
                            id="unitPrice"
                            type="number"
                            step="0.01"
                            min="0"
                            value={unitPrice}
                            onChange={(e) => setUnitPrice(e.target.value)}
                            placeholder="0.00"
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={handleClose} disabled={isSubmitting}>
                        Cancelar
                    </Button>
                    <Button onClick={handleSubmit} disabled={isSubmitting}>
                        {isSubmitting ? 'Guardando...' : 'Guardar'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}