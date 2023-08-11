const insertProduct = {
  id: 4,
  name: 'Martelo de Thor',
  price: '30 peças de ouro',
  orderId: 5,
};

const createdResponse = {
  id: 4,
  name: 'Martelo de Thor',
  price: '30 peças de ouro',
}

const validRequestBody = {
  name: 'Martelo de Thor',
  price: '30 peças de ouro',
  orderId: 5,
};

const requestBodyWithoutName = {
  name: '',
  price: '30 peças de ouro',
  orderId: 5,
};

export default {
  insertProduct,
  createdResponse,
  validRequestBody,
  requestBodyWithoutName,
}