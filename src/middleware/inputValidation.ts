import { NextFunction, Request, Response } from 'express';
import schema from './schema';

const createProduct = async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<Response | void> => {
  const { name, price } = request.body;
  const { error } = schema.createProduct.validate({ name, price });
  if (error?.details[0].type === 'any.required') {
    return response.status(400).json({
      message: error.message,
    });
  }
  if (error?.details[0].type === 'string.min' || error?.details[0].type === 'string.base') {
    return response.status(422).json({
      message: error.message,
    });
  }
  next();
};

export default {
  createProduct,
};