import { Product } from './Product';

export type Order = {
  id: number;
  userId: number;
  productIds?: number | number[] | Product[]; /* | Model<Product, Optional<Product, 'id'>>[] */
};
