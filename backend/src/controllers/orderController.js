import {
    createOrderSchema,
    updateOrderSchema,
    orderIdSchema
} from '../schemas/ordenSchema.js';

export class OrderController {
    constructor({ orderModel }) {
        this.orderModel = orderModel;
    }

    findAll = async (req, res, next) => {
        try {
            const orders = await this.orderModel.findAll();
            res.json(orders);
        } catch (error) {
            next(error);
        }
    };

    findById = async (req, res, next) => {
        try {
            const { id } = orderIdSchema.parse(req.params);
            const order = await this.orderModel.findById(id);
            res.json(order);
        } catch (error) {
            next(error);
        }
    };

    create = async (req, res, next) => {
        try {
            const data = createOrderSchema.parse(req.body);
            const order = await this.orderModel.createOrder(data);
            res.status(201).json(order);
        } catch (error) {
            next(error);
        }
    };

    update = async (req, res, next) => {
        try {
            const { id } = orderIdSchema.parse(req.params);
            const data = updateOrderSchema.parse(req.body);

            const existing = await this.orderModel.findById(id);
            if (existing?.status === 'Completed') {
                return res.status(400).json({
                    error: 'No se puede modificar una orden completada'
                });
            }

            const order = await this.orderModel.updateOrder(id, data);
            res.json(order);
        } catch (error) {
            next(error);
        }
    };

    delete = async (req, res, next) => {
        try {
            const { id } = orderIdSchema.parse(req.params);

            const existing = await this.orderModel.findById(id);
            if (existing?.status === 'Completed') {
                return res.status(400).json({
                    error: 'No se puede eliminar una orden completada'
                });
            }

            await this.orderModel.deleteOrder(id);
            res.json({ message: 'Orden eliminada' });
        } catch (error) {
            next(error);
        }
    };
}