import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import orderMock from '../../mocks/order.mock';
import OrderModel from '../../../src/database/models/order.model';
import ProductModel from '../../../src/database/models/product.model';
import { Product } from '../../../src/types/Product';

chai.use(chaiHttp);

describe('GET /orders', function () { 
  beforeEach(function () { sinon.restore(); });
/*   it('Verifica se é possível retornar todos os pedidos cadastrados', async function() {
    const getAllResponse = orderMock.getAllResponse
      .map((order) => {
        const productArray = order.productIds as Product[];
        const productSequelizeModel = productArray
          .map((product) => ProductModel.build(product));
        return OrderModel
          .build({...order, productIds: productSequelizeModel});
      });

    sinon.stub(OrderModel, 'findAll').resolves(getAllResponse);
    const httpResponse = await chai
      .request(app)
      .get('/orders');
    
    expect(httpResponse.status).to.be.equal(201);
    expect(httpResponse.body).to.be.an('array');
  }); */
});
