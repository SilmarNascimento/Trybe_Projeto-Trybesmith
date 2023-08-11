import
ProductModel,
{
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
  return { status: 'SUCCESSFUL', data: response.dataValues };
};

export default {
  newProduct,
};