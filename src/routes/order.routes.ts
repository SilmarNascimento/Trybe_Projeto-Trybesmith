import { Router } from 'express';
import orderController from '../controller/order.controller';

const orderRouter = Router();

orderRouter.get('/', orderController.getAllOrders);

export default orderRouter;