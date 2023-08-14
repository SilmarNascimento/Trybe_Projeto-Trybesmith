const Joi = require('joi');

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

const placeOrder = Joi.object({
  userId: userIdSchema,
  productIds: productIdsSchema,
});

const obj = {
  userId: 1,
};

const validate = (param) => {
  const array422Errors = ['number.base', 'array.base', 'array.min'];
  const { error } = placeOrder.validate(param);
  if (error?.details[0].type === 'any.required') {
    return { message: error.message };
  }
  if (error && array422Errors.includes(error.details[0].type)) {
    return { message: error.message };
  }
};

console.log(validate(obj));