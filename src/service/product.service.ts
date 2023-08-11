import
Product,
{
  ProductInputtableTypes,
} from '../database/models/product.model';

const createProduct = async (product: ProductInputtableTypes) => {
  const response = await Product.create(product);
  return response.dataValues;
};

export default {
  createProduct,
};