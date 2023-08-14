import Joi from 'joi';

const nameSchema = Joi.string().min(3).required();
const priceSchema = Joi.string().min(3).required();
const userIdSchema = Joi.number().strict().required();
const productIdsSchema = Joi
  .array()
  .min(1)
  .items(Joi.number().strict())
  .required()
  .messages({
    'number.base': '"productIds" must include only numbers',
    'array.min': '"productIds" must include only numbers',
  });

const createProduct = Joi.object({
  name: nameSchema,
  price: priceSchema,
});

const placeOrder = Joi.object({
  userId: userIdSchema,
  productIds: productIdsSchema,
});

export default {
  createProduct,
  placeOrder,
};
