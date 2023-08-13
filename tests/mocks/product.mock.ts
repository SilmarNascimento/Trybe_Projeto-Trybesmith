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

export default {
  insertProduct,
  createdResponse,
  validRequestBody,
  requestBodyWithoutName,
  getAllProductsResponse,
}