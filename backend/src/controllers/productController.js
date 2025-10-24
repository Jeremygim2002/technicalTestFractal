import {
    createProductSchema,
    updateProductSchema,
    productIdSchema
} from '../schemas/productSchema.js';

export class ProductController {
    constructor({ productModel }) {
        this.productModel = productModel;
    }

    findAll = async (req, res, next) => {
        try {
            const products = await this.productModel.findAll();
            res.json(products);
        } catch (error) {
            next(error);
        }
    };

    findById = async (req, res, next) => {
        try {
            const { id } = productIdSchema.parse(req.params);
            const product = await this.productModel.findById(id);
            res.json(product);
        } catch (error) {
            next(error);
        }
    };

    create = async (req, res, next) => {
        try {
            const data = createProductSchema.parse(req.body);
            const product = await this.productModel.create(data);
            res.status(201).json(product);
        } catch (error) {
            next(error);
        }
    };

    update = async (req, res, next) => {
        try {
            const { id } = productIdSchema.parse(req.params);
            const data = updateProductSchema.parse(req.body);
            const product = await this.productModel.update(id, data);
            res.json(product);
        } catch (error) {
            next(error);
        }
    };

    delete = async (req, res, next) => {
        try {
            const { id } = productIdSchema.parse(req.params);
            await this.productModel.delete(id);
            res.json({ message: 'Producto eliminado' });
        } catch (error) {
            next(error);
        }
    };
}