import { Request, Response } from 'express';
import productService from '../service/product.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

const createProduct = async (request: Request, response: Response): Promise<Response> => {
  const { name, price, orderId } = request.body;
  const { status, data } = await productService.newProduct({ name, price, orderId });
  return response.status(mapStatusHTTP(status)).json(data);
};

const getAllProducts = async (_request: Request, response: Response): Promise<Response> => {
  const { status, data } = await productService.getAllProducts();
  return response.status(mapStatusHTTP(status)).json(data);
};

export default {
  createProduct,
  getAllProducts,
};