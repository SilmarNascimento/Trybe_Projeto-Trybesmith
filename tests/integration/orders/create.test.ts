import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app'
import jwtUtil from '../../../src/utils/jwt.util';
import orderMock from '../../mocks/order.mock';
import UserModel from '../../../src/database/models/user.model';
import bcrypt from 'bcryptjs';
import OrderModel from '../../../src/database/models/order.model';
import ProductModel from '../../../src/database/models/product.model';

chai.use(chaiHttp);

describe('POST /orders', function () { 
  beforeEach(function () { sinon.restore(); });

  const SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS || 10;


  const userPayload = {
    id: 1,
    username: 'Silmar Nascimento'
  };

  const userFromTokenFound = UserModel.build({
    id: 1,
    username: 'Silmar Nascimento',
    vocation: 'magician',
    level: 20,
    password: 'Shanloo',
  });

  const userFromServiceFound = UserModel.build({
    id: 1,
    username: 'Silmar Nascimento',
    vocation: 'magician',
    level: 20,
    password: bcrypt.hashSync('Shanloo', SALT_ROUNDS),
  });

  const token = jwtUtil.sign(userPayload);

  it('verifica se não é possível fazer um pedido sem um token', async function() {
    const requestBody = orderMock.validRequestPlaceOrder;

    const httpResponse = await chai
      .request(app)
      .post('/orders')
      .send(requestBody);

    expect(httpResponse.status).to.be.equal(401);
    expect(httpResponse.body).to.be.deep.equal(orderMock.responseTokenNotFound);
  });

  it('verifica se não é possível fazer um pedido sem um token', async function() {
    const requestBody = orderMock.validRequestPlaceOrder;
    sinon.stub(UserModel, 'findOne').resolves(null);

    const httpResponse = await chai
      .request(app)
      .post('/orders')
      .set('Authorization', `Bearer InvalidToken`)
      .send(requestBody);

    expect(httpResponse.status).to.be.equal(401);
    expect(httpResponse.body).to.be.deep.equal(orderMock.responseInvalidToken);
  });

  it('verifica se não é possível fazer um pedido sem a chave "userId" na requisição', async function() {
    const requestBody = orderMock.requestPlaceOrderWithoutUserId;
    sinon.stub(UserModel, 'findOne').resolves(userFromTokenFound);

    const httpResponse = await chai
      .request(app)
      .post('/orders')
      .set('Authorization', `Bearer ${token}`)
      .send(requestBody);

    expect(httpResponse.status).to.be.equal(400);
    expect(httpResponse.body).to.be.deep.equal(orderMock.responseRequestWithoutUserId);
  });

  it('verifica se não é possível fazer um pedido com a chave "userId" com type errado na requisição', async function() {
    const requestBody = orderMock.requestPlaceOrderInvalideTypeUserId;
    sinon.stub(UserModel, 'findOne').resolves(userFromTokenFound);

    const httpResponse = await chai
      .request(app)
      .post('/orders')
      .set('Authorization', `Bearer ${token}`)
      .send(requestBody);

    expect(httpResponse.status).to.be.equal(422);
    expect(httpResponse.body).to.be.deep.equal(orderMock.responseRequestInvalidTypeUserId);
  });

  it('verifica se não é possível fazer um pedido com a chave "userId" de um usuário inexistente na requisição', async function() {
    const requestBody = orderMock.validRequestPlaceOrder;
    sinon.stub(UserModel, 'findOne')
      .onFirstCall()
      .resolves(userFromTokenFound)
      .onSecondCall()
      .resolves(null);

    const httpResponse = await chai
      .request(app)
      .post('/orders')
      .set('Authorization', `Bearer ${token}`)
      .send(requestBody);

    expect(httpResponse.status).to.be.equal(404);
    expect(httpResponse.body).to.be.deep.equal(orderMock.responseRequestUserNotFound);
  });

  it('verifica se não é possível fazer um pedido sem a chave "productIds" na requisição', async function() {
    const requestBody = orderMock.requestPlaceOrderWithoutProductIds;
    sinon.stub(UserModel, 'findOne').resolves(userFromTokenFound);

    const httpResponse = await chai
      .request(app)
      .post('/orders')
      .set('Authorization', `Bearer ${token}`)
      .send(requestBody);

    expect(httpResponse.status).to.be.equal(400);
    expect(httpResponse.body).to.be.deep.equal(orderMock.responseRequestWithoutProductIds);
  });

  it('verifica se não é possível fazer um pedido com a chave "productIds" com type errado na requisição', async function() {
    const requestBody = orderMock.requestPlaceOrderInvalidTypeProductIds;
    sinon.stub(UserModel, 'findOne').resolves(userFromTokenFound);

    const httpResponse = await chai
      .request(app)
      .post('/orders')
      .set('Authorization', `Bearer ${token}`)
      .send(requestBody);

    expect(httpResponse.status).to.be.equal(422);
    expect(httpResponse.body).to.be.deep.equal(orderMock.responseRequestInvalidTypeProductIds);
  });

  it('verifica se não é possível fazer um pedido com a chave "productIds" com array vazio ou de types errados na requisição', async function() {
    const requestBody = orderMock.requestPlaceOrderEmptyProductIds;
    sinon.stub(UserModel, 'findOne').resolves(userFromTokenFound);

    const httpResponse = await chai
      .request(app)
      .post('/orders')
      .set('Authorization', `Bearer ${token}`)
      .send(requestBody);

    expect(httpResponse.status).to.be.equal(422);
    expect(httpResponse.body).to.be.deep.equal(orderMock.responseRequestEmptyProductIds);
  });

  it('verifica que é possível fazer um pedido uma requisição certa e com um usuário logado', async function() {
    const requestBody = orderMock.validRequestPlaceOrder;
    sinon.stub(UserModel, 'findOne')
      .onFirstCall()
      .resolves(userFromTokenFound)
      .onSecondCall()
      .resolves(userFromServiceFound);

    const mockCreateOrder = OrderModel.build(orderMock.createOrderMock);
    sinon.stub(OrderModel, 'create').resolves(mockCreateOrder);
    
    const mockCreatProduct = ProductModel.build(orderMock.createProductMock)
    sinon.stub(ProductModel, 'create').resolves(mockCreatProduct);

    const httpResponse = await chai
      .request(app)
      .post('/orders')
      .set('Authorization', `Bearer ${token}`)
      .send(requestBody);

    expect(httpResponse.status).to.be.equal(201);
    expect(httpResponse.body).to.be.deep.equal(orderMock.validRequestPlaceOrder);
  });

});
