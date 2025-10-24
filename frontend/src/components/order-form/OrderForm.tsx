import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatPrice, formatDate } from '@/lib/helpers';

interface OrderFormProps {
    orderNumber: string;
    onOrderNumberChange: (value: string) => void;
    totalProducts: number;
    finalPrice: number;
}

export function OrderForm({
    orderNumber,
    onOrderNumberChange,
    totalProducts,
    finalPrice,
}: OrderFormProps) {
    return (
        <div className="border rounded-lg p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="orderNumber">Order</Label>
                    <Input
                        id="orderNumber"
                        value={orderNumber}
                        onChange={(e) => onOrderNumberChange(e.target.value)}
                        placeholder="ORD-001"
                    />
                </div>

                <div>
                    <Label htmlFor="date">Fecha</Label>
                    <Input
                        id="date"
                        value={formatDate()}
                        disabled
                    />
                </div>

                <div>
                    <Label htmlFor="totalProducts">Productos</Label>
                    <Input
                        id="totalProducts"
                        value={totalProducts}
                        disabled
                    />
                </div>

                <div>
                    <Label htmlFor="finalPrice">Precio Final</Label>
                    <Input
                        id="finalPrice"
                        value={formatPrice(finalPrice)}
                        disabled
                    />
                </div>
            </div>
        </div>
    );
}