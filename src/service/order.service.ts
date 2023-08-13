import OrderModel, { OrderSequelizeModel } from '../database/models/order.model';
import { Order } from '../types/Order';
import ProductModel, { ProductSequelizeModel } from '../database/models/product.model';
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

const getAllOrders = async (): Promise<ServiceResponse<Order[]>> => {
  const getAllResponse = await OrderModel.findAll({
    include: [{ model: ProductModel, as: 'productIds' }],
  });
  const processedData = getAllResponse
    .map((order: OrderSequelizeModel) => {
      const productsArray = order.dataValues.productIds as unknown as ProductSequelizeModel[];
      const ids = productsArray
        .map((products: ProductSequelizeModel) => products.dataValues.id);
      return { ...order.dataValues, productIds: ids };
    });
  return { status: 'SUCCESSFUL', data: processedData };
};

export default {
  getAllOrders,
};