const requestWhitoutName = {
  price:'30 diamonds',
  orderId: 2,
};

const requestWhitoutPrice = {
  name: "Xal'atath, Blade of the Black Empire",
  orderId: 2,
};

const requestNoStringName = {
  name: 2,
  price:'30 diamons',
  orderId: 2,
};

const requestNoStringPrice = {
  name: "Xal'atath, Blade of the Black Empire",
  price: 30,
  orderId: 2,
};

const requestInvalidName = {
  name: 'Xa',
  price:'30 diamonds',
  orderId: 2,
};

const requestInvalidPrice = {
  name: "Xal'atath, Blade of the Black Empire",
  price: '20',
  orderId: 2,
};

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

const getAllProductsResponse = [
  {
    id: 1,
    name: "Pedra Filosofal",
    price: "20 gold",
    orderId: 2
  },
  {
    id: 2,
    name: "Lança do Destino",
    price: "100 diamond",
    orderId: 1
  }
];

const responseRequestWithoutName = { message: '"name" is required'};
const responseRequestWithoutPrice = { message: '"price" is required' };
const responseRequestNoStringName = { message: '"name" must be a string' };
const responseRequestNoStringPrice = { message: '"price" must be a string' };
const responseRequestInvalidName = { message: '"name" length must be at least 3 characters long' };
const responseRequestInvalidPrice = { message: '"price" length must be at least 3 characters long' };

export default {
  requestWhitoutName,
  requestWhitoutPrice,
  requestNoStringName,
  requestNoStringPrice,
  requestInvalidName,
  requestInvalidPrice,
  responseRequestWithoutName,
  responseRequestWithoutPrice,
  responseRequestNoStringName,
  responseRequestNoStringPrice,
  responseRequestInvalidName,
  responseRequestInvalidPrice,
  insertProduct,
  createdResponse,
  validRequestBody,
  requestBodyWithoutName,
  getAllProductsResponse,
}