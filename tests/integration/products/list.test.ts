import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app'
import ProductModel from '../../../src/database/models/product.model';
import productMock from '../../mocks/product.mock';

chai.use(chaiHttp);

describe('GET /products', function () { 
  beforeEach(function () { sinon.restore(); });
  it('Verifica se é possível retornar todos os produtos cadastrados', async function() {
    const productsFound = productMock.getAllProductsResponse
        .map((product) => ProductModel.build(product));
    sinon.stub(ProductModel, 'findAll').resolves(productsFound);

    const httpResponse = await chai
      .request(app)
      .get('/products')
      .send();

    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.be.deep.equal(productMock.getAllProductsResponse);
  });
});
