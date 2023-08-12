import OrderModel, { OrderSequelizeModel } from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import { ServiceResponse } from '../types/ServiceResponse';

/* const newProduct = async (product: ProductInputtableTypes): Promise<ServiceResponse<Product>> => {
  const { name, price, orderId } = product;
  if (!name || !price || !orderId) {
    return { status: 'INVALID_VALUE', data: { message: 'Dados inválidos' } };
  }
  const response = await ProductModel.create(product);
  const { id } = response.dataValues;
  return { status: 'CREATED', data: { id, name, price } };
}; */

const getAllOrders = async (): Promise<ServiceResponse<OrderSequelizeModel[]>> => {
  const getAllResponse = await OrderModel.findAll({
    include: [{ model: ProductModel, as: 'productIds' }],
  });
  return { status: 'SUCCESSFUL', data: getAllResponse };
};

export default {
  getAllOrders,
};