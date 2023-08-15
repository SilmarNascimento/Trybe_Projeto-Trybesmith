import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app'
import jwtUtil from '../../../src/utils/jwt.util';
import orderMock from '../../mocks/order.mock';
import UserModel from '../../../src/database/models/user.model';

chai.use(chaiHttp);

describe('POST /orders', function () { 
  beforeEach(function () { sinon.restore(); });

  const userPayload = {
    id: 1,
    username: 'Silmar Nascimento'
  };

  const userFound = UserModel.build({
    id: 1,
    username: 'Silmar Nascimento',
    vocation: 'magician',
    level: 20,
    password: 'Shanloo',
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

  it('verifica se não é possível fazer um pedido sem a chave userID na requisição', async function() {
    const requestBody = orderMock.requestPlaceOrderWithoutUserId;
    sinon.stub(UserModel, 'findOne').resolves(userFound);

    const httpResponse = await chai
      .request(app)
      .post('/orders')
      .set('Authorization', `Bearer ${token}`)
      .send(requestBody);

    expect(httpResponse.status).to.be.equal(400);
    expect(httpResponse.body).to.be.deep.equal(orderMock.responseRequestWithoutUserId);
  });

});
