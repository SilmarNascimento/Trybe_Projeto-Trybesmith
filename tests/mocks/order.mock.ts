const productsOrder1 = [
  {
    "id": 1,
    "name": "Pedra Filosofal",
    "price": "20 gold",
    "orderId": null
  },
  {
    "id": 2,
    "name": "Lança do Destino",
    "price": "100 diamond",
    "orderId": 1
  }
];

const productsOrder2 = [
  {
    "id": 3,
    "name": "Xal'atath, Blade of the Black Empire",
    "price": "50 diamonds",
    "orderId": 2
  }
];

const getAllResponse = [
  {
    "id": 1,
    "userId": 2,
    "productIds": productsOrder1
  },
  {
    "id": 2,
    "userId": 1,
    "productIds": productsOrder2
  }
];

const validRequestPlaceOrder = {
  userId: 1,
  productIds: [1, 2]
};

const requestPlaceOrderWithoutUserId = {
  productIds: [1, 2]
};
const requestPlaceOrderInvalideTypeUserId = {
  userId: '1',
  productIds: [1, 2]
};

const requestPlaceOrderWithoutProductIds = {
  userId: 1,
};

const requestPlaceOrderInvalidTypeProductIds = {
  userId: 1,
  productIds: 3,
};

const requestPlaceOrderEmptyProductIds = {
  userId: 1,
  productIds: []
};

const responseTokenNotFound = { message: 'Token not found' };
const responseInvalidToken = { message: 'Invalid token' };
const responseRequestWithoutUserId = { message: '"userId" is required' };
const responseRequestInvalidTypeUserId = { message: '"userId" must be a number' };
const responseRequestUserNotFound = { message: '"userId" not found' };
const responseRequestWithoutProductIds = { message: '"productIds" is required' };
const responseRequestInvalidTypeProductIds = { message: '"productIds" must be an array' };
const responseRequestEmptyProductIds = { message: '"productIds" must include only numbers' };




export default {
  getAllResponse,
  validRequestPlaceOrder,
  requestPlaceOrderWithoutUserId,
  requestPlaceOrderInvalideTypeUserId,
  requestPlaceOrderWithoutProductIds,
  requestPlaceOrderInvalidTypeProductIds,
  requestPlaceOrderEmptyProductIds,
  responseTokenNotFound,
  responseInvalidToken,
  responseRequestWithoutUserId,
  responseRequestInvalidTypeUserId,
  responseRequestUserNotFound,
  responseRequestWithoutProductIds,
  responseRequestInvalidTypeProductIds,
  responseRequestEmptyProductIds,
}