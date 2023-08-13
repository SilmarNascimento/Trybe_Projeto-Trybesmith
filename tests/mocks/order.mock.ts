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
]

export default {
  getAllResponse,
}