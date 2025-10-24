import { useNavigate } from 'react-router-dom';
import { useOrders } from '@/hooks/useOrders';
import { OrderTable } from '@/components/orders/OrderTable';
import { Button } from '@/components/ui/button';
import { orderService } from '@/services/orderService';
import { showConfirm, showAlert } from '@/lib/helpers';
import type { Order } from '@/types/order';

export default function MyOrders() {
  const navigate = useNavigate();
  const { orders, loading, refetch } = useOrders();

  const handleDelete = async (order: Order) => {
    if (!showConfirm(`¿Eliminar la orden ${order.orderNumber}? Esta acción no se puede deshacer.`)) {
      return;
    }

    try {
      await orderService.delete(order.id);
      await refetch();
    } catch (error) {
      console.error('Error deleting order:', error);
      showAlert('Error al eliminar la orden');
    }
  };

  const handleStatusChange = async (orderId: number, newStatus: Order['status']) => {
    try {
      await orderService.update(orderId, { status: newStatus });
      await refetch();
    } catch (error) {
      console.error('Error changing status:', error);
      showAlert('Error al cambiar el estado');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <p className="text-center">Cargando órdenes...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Mis Ordenes</h1>
        <Button onClick={() => navigate('/add-order')}>
          Nueva Orden
        </Button>
      </div>

      <OrderTable
        orders={orders}
        onEdit={(id) => navigate(`/add-order/${id}`)}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}