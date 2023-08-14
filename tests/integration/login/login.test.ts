import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import UserModel from '../../../src/database/models/user.model';
import userMock from '../../mocks/user.mock';
import bcrypt from 'bcryptjs';
import jwtUtil from '../../../src/utils/jwt.util';

chai.use(chaiHttp);

describe('POST /login', function () { 
  const SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS || 10;
  const FALSE_SALT_ROUNDS = 5;

  beforeEach(function () { sinon.restore(); });
 
  it('verifica que não é possível fazer login sem username', async function() {
    const requestBody = userMock.loginWhithoutUsername;

    const httpResponse = await chai
      .request(app)
      .post('/login')
      .send(requestBody);

    expect(httpResponse.status).to.be.equal(400);
    expect(httpResponse.body).to.be.deep.equal(userMock.responseWithoutData);
  });

  it('verifica que não é possível fazer login sem password', async function() {
    const requestBody = userMock.loginWithoutPassword;

    const httpResponse = await chai
      .request(app)
      .post('/login')
      .send(requestBody);

    expect(httpResponse.status).to.be.equal(400);
    expect(httpResponse.body).to.be.deep.equal(userMock.responseWithoutData);
  });

  it('verifica que não é possível fazer login de um usuário não cadastrado', async function() {
    const requestBody = userMock.validLogin;
    sinon.stub(UserModel, 'findOne').resolves(null);

    const httpResponse = await chai
      .request(app)
      .post('/login')
      .send(requestBody);

    expect(httpResponse.status).to.be.equal(401);
    expect(httpResponse.body).to.be.deep.equal(userMock.responseInvalidData);
  });

  it('verifica que não é possível fazer login de um usuário com senha inválida', async function() {
    const userFound = UserModel.build({
      username: 'Silmar Nascimento',
      vocation: 'magician',
      level: 20,
      password: bcrypt.hashSync('Shanloo', FALSE_SALT_ROUNDS),
    })
    const requestBody = userMock.validLogin;
    sinon.stub(UserModel, 'findOne').resolves(userFound);

    const httpResponse = await chai
      .request(app)
      .post('/login')
      .send(requestBody);

    expect(httpResponse.status).to.be.equal(401);
    expect(httpResponse.body).to.be.deep.equal(userMock.responseInvalidData);
  });

  it('verifica que é possível fazer o login de um usuário com username e password válidos', async function() {
    const userFound = UserModel.build({
      id: 1,
      username: 'Silmar Nascimento',
      vocation: 'magician',
      level: 20,
      password: bcrypt.hashSync('Shanloo', SALT_ROUNDS),
    });
    const token = jwtUtil.sign({id:1, username: 'Silmar Nascimento'});
    const requestBody = userMock.validLogin;
    sinon.stub(UserModel, 'findOne').resolves(userFound);

    const httpResponse = await chai
      .request(app)
      .post('/login')
      .send(requestBody);

    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.have.key('token');
    expect(httpResponse.body).to.be.deep.equal({ token });
  });

});
