import OrderModel,
{
  OrderInputtableTypes,
  OrderSequelizeModel,
} from '../database/models/order.model';
import { Order } from '../types/Order';
import ProductModel, { ProductSequelizeModel } from '../database/models/product.model';
import { ServiceResponse } from '../types/ServiceResponse';
import UserModel from '../database/models/user.model';

const placeOrder = async (
  { userId, productIds }: OrderInputtableTypes,
): Promise<ServiceResponse<OrderInputtableTypes>> => {
  const userFound = await UserModel.findOne({ where: { id: userId } });
  if (!userFound) {
    return { status: 'NOT_FOUND', data: { message: '"userId" not found' } };
  }
  const insertOrder = await OrderModel.create({ userId, productIds });
  await ProductModel.create({
    name: userFound.dataValues.username,
    orderId: insertOrder.dataValues.id,
    price: '',
  });
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