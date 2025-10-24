import { Badge } from '@/components/ui/badge';
import { getStatusBadgeClass } from '@/lib/helpers';
import type { OrderStatus } from '@/types/order';

interface StatusBadgeProps {
    status: OrderStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
    return (
        <Badge className={getStatusBadgeClass(status)} variant="outline">
            {status}
        </Badge>
    );
}