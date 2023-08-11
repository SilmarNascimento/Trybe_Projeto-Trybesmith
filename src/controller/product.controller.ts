import { Request, Response } from 'express';
import productService from '../service';

const createProduct = async (request: Request, response: Response) => {
  productService.createProduct();
};

export default {
  createProduct,
};