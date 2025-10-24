import { Router } from 'express';
import { ProductController } from '../controllers/productController.js';

export const createProductRoutes = ({ productModel }) => {
    const router = Router();
    const productController = new ProductController({ productModel });

    router.get('/', productController.findAll);
    router.get('/:id', productController.findById);
    router.post('/', productController.create);
    router.put('/:id', productController.update);
    router.delete('/:id', productController.delete);

    return router;
};