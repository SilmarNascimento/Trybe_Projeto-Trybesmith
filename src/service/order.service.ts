import OrderModel, { OrderSequelizeModel } from '../database/models/order.model';
import { Order } from '../types/Order';
import ProductModel, { ProductSequelizeModel } from '../database/models/product.model';
import { ServiceResponse } from '../types/ServiceResponse';
import UserModel from '../database/models/user.model';

type PlaceOrderRequest = {
  userId: number,
  productIds: number[],
};

const placeOrder = async (
  { userId, productIds }: PlaceOrderRequest,
): Promise<ServiceResponse<PlaceOrderRequest>> => {
  const userFound = await UserModel.findOne({ where: { id: userId } });
  if (!userFound) return { status: 'NOT_FOUND', data: { message: '"userId" not found' } };
  const insertOrder = await OrderModel.create({ userId, productIds });
  const promises = productIds.map(async () => {
    const createProductResponse = await ProductModel.create({
      name: userFound.dataValues.username,
      orderId: insertOrder.dataValues.id,
      price: '',
    });
    return createProductResponse;
  });
  await Promise.all(promises);
  return { status: 'CREATED', data: { userId, productIds } };
};

const getAllOrders = async (): Promise<ServiceResponse<Order[]>> => {
  const getAllResponse = await OrderModel.findAll({
    include: [{ model: ProductModel, as: 'productIds' }],
  });
  console.log(getAllResponse);
  
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
  placeOrder,
};