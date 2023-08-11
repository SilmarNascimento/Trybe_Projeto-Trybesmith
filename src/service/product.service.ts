import ProductModel, {
  ProductInputtableTypes,
} from '../database/models/product.model';
import { Product } from '../types/Product';
import { ServiceResponse } from '../types/ServiceResponse';

const newProduct = async (product: ProductInputtableTypes): Promise<ServiceResponse<Product>> => {
  const { name, price, orderId } = product;
  if (!name || !price || !orderId) {
    return { status: 'INVALID_VALUE', data: { message: 'Dados inválidos' } };
  }
  const response = await ProductModel.create(product);
  const { id } = response.dataValues;
  return { status: 'CREATED', data: { id, name, price } };
};

export default {
  newProduct,
};