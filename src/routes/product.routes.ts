import { Router } from 'express';
import productController from '../controller';

const productRouter = Router();

productRouter.post('/', productController.createProduct);

export default productRouter;
