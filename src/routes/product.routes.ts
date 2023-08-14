import { Router } from 'express';
import productController from '../controller/product.controller';
import inputValidation from '../middleware/inputValidation';

const productRouter = Router();

productRouter.post('/', inputValidation.createProduct, productController.createProduct);
productRouter.get('/', productController.getAllProducts);

export default productRouter;
