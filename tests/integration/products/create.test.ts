import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import ProductModel from '../../../src/database/models/product.model';
import app from '../../../src/app'
import productMock from '../../mocks/product.mock';

chai.use(chaiHttp);

describe('POST /products', function () { 
  beforeEach(function () { sinon.restore(); });
  it('verifica se é possível fazer o cadastro de um produto', async function() {
    const createdProduct = ProductModel.build(productMock.insertProduct);
    const requestBody = productMock.validRequestBody;
    sinon.stub(ProductModel, 'create').resolves(createdProduct);

    const httpResponse = await chai
      .request(app)
      .post('/products')
      .send(requestBody);

    console.log('resposta da requisição: ', httpResponse);
    

    expect(httpResponse.status).to.be.equal(201);
    expect(httpResponse.body).to.be.deep.equal(productMock.createdResponse);
  });

  it('verifica que é retornado um erro ao cadastrar de um produto inválido', async function() {
    const requestBody = productMock.requestBodyWithoutName;

    const httpResponse = await chai
      .request(app)
      .post('/products')
      .send(requestBody);

    expect(httpResponse.status).to.be.equal(422);
    expect(httpResponse.body).to.be.deep.equal({ message: 'Dados inválidos' });
  });

});
