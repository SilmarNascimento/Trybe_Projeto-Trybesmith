import Joi from 'joi';

const nameSchema = Joi.string().min(3).required();
const priceSchema = Joi.string().min(3).required();

const createProduct = Joi.object({
  name: nameSchema,
  price: priceSchema,
});

export default {
  createProduct,
};
