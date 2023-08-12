import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import orderService from '../service/order.service';

const getAllOrders = async (_request: Request, response: Response): Promise<Response> => {
  const { status, data } = await orderService.getAllOrders();
  return response.status(mapStatusHTTP(status)).json(data);
};

export default {
  getAllOrders,
};