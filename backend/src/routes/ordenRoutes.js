import { Router } from 'express';
import { OrderController } from '../controllers/orderController.js';

export const createOrderRoutes = ({ orderModel }) => {
    const router = Router();
    const orderController = new OrderController({ orderModel });

    router.get('/', orderController.findAll);
    router.get('/:id', orderController.findById);
    router.post('/', orderController.create);
    router.put('/:id', orderController.update);
    router.delete('/:id', orderController.delete);

    return router;
};