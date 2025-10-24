import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { formatPrice, validatePositiveNumber, showAlert } from '@/lib/helpers';
import type { Product } from '@/types/product';
import type { OrderFormProduct } from '@/types/order';

interface ProductDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    products: Product[];
    existingProductIds: number[];
    editingProduct?: OrderFormProduct | null;
    onSubmit: (productId: number, quantity: number) => void;
}

export function ProductDialog({
    open,
    onOpenChange,
    products,
    existingProductIds,
    editingProduct,
    onSubmit,
}: ProductDialogProps) {
    const [selectedProductId, setSelectedProductId] = useState<string>('');
    const [quantity, setQuantity] = useState<string>('1');

    const isEditMode = !!editingProduct;
    const availableProducts = isEditMode 
        ? products 
        : products.filter(p => !existingProductIds.includes(p.id));

    useEffect(() => {
        if (isEditMode && editingProduct) {
            setSelectedProductId(editingProduct.productId.toString());
            setQuantity(editingProduct.quantity.toString());
        } else {
            setSelectedProductId('');
            setQuantity('1');
        }
    }, [editingProduct, isEditMode, open]);

    const handleSubmit = () => {
        try {
            if (!selectedProductId) {
                showAlert('Debes seleccionar un producto');
                return;
            }
            
            const qty = validatePositiveNumber(quantity, 'La cantidad');
            onSubmit(parseInt(selectedProductId), qty);
            handleClose();
        } catch (error) {
            showAlert(error instanceof Error ? error.message : 'Error en validación');
        }
    };

    const handleClose = () => {
        setSelectedProductId('');
        setQuantity('1');
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {isEditMode ? 'Editar Producto' : 'Agregar Producto'}
                    </DialogTitle>
                    <DialogDescription>
                        {isEditMode 
                            ? `Actualiza la cantidad de ${editingProduct?.product.name}`
                            : 'Selecciona un producto y la cantidad'
                        }
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div>
                        <Label htmlFor="product">Producto</Label>
                        {isEditMode ? (
                            <Input 
                                value={editingProduct?.product.name} 
                                disabled 
                            />
                        ) : (
                            <Select value={selectedProductId} onValueChange={setSelectedProductId}>
                                <SelectTrigger id="product">
                                    <SelectValue placeholder="Selecciona un producto" />
                                </SelectTrigger>
                                <SelectContent>
                                    {availableProducts.map((product) => (
                                        <SelectItem key={product.id} value={product.id.toString()}>
                                            {product.name} - {formatPrice(product.unitPrice)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="quantity">Cantidad</Label>
                        <Input
                            id="quantity"
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button onClick={handleSubmit}>
                        {isEditMode ? 'Guardar' : 'Agregar'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}