import { Router } from 'express';
import orderController from '../controller/order.controller';
import inputValidation from '../middleware/inputValidation';
import tokenValidation from '../middleware/tokenValidation';

const orderRouter = Router();

orderRouter.get('/', orderController.getAllOrders);
orderRouter.post('/', tokenValidation, inputValidation.placeOrder, orderController.placeOrder);

export default orderRouter;