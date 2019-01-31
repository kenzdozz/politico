import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import statusCodes from '../../helpers/statusCode';
import { users } from '../../helpers/mockData';
import User from '../../database/models/User';

chai.use(chaiHttp);

const newUser = users[0];

describe('Login a user: POST /auth/login', () => {
  before(async () => {
    await User.create(users[0]);
  });

  it('should successfully login a user', async () => {
    const response = await chai.request(app)
      .post('/api/v1/auth/login').send({
        email: newUser.email,
        password: newUser.password,
      });

    expect(response.status).to.eqls(statusCodes.success);
    expect(response.body).to.be.an('object');
    expect(response.body.status).to.eqls(statusCodes.created);
    expect(response.body.data[0].token).to.be.a('string');
    expect(response.body.data[0].user).to.be.an('object');
    expect(response.body.data[0].user.firstname).to.eqls(newUser.firstname);
    expect(response.body.data[0].user.lastname).to.eqls(newUser.lastname);
    expect(response.body.data[0].user.othername).to.eqls(newUser.othername);
    expect(response.body.data[0].user.phoneNumber).to.eqls(newUser.phoneNumber);
    expect(response.body.data[0].user.id).to.be.a('number');
  });

  it('should fail to login a user with incorrect details', async () => {
    const response = await chai.request(app)
      .post('/api/v1/auth/login').send({
        email: 'random@email.com',
        password: 'User.password',
      });

    expect(response.status).to.eqls(statusCodes.unAuthorized);
    expect(response.body.status).to.eqls(statusCodes.unAuthorized);
    expect(response.body.error).eqls('Email address or password not correct.');
  });
});
