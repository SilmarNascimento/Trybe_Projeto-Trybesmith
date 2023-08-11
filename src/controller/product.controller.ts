import { Request, Response } from 'express';
import productService from '../service';
import { ServiceResponse } from '../types/ServiceResponse';
import mapStatusHTTP from '../utils/mapStatusHTTP';

const createProduct = async (request: Request, response: Response) => {
  const { name, price, orderId } = request.body;
  const { status, data } = productService.createProduct({ name, price, orderId });
  if (status !== 'SUCCESSFUL') {
    return response.status(mapStatusHTTP(status)).json(data);
  }
  return response.status(mapStatusHTTP(status)).json(data);
};

export default {
  createProduct,
};