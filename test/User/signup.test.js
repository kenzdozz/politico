import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import statusCodes from '../../helpers/statusCode';
import { users } from '../../helpers/mockData';

chai.use(chaiHttp);

const newUser = users[0];
const newUser2 = users[1];
delete newUser2.firstname;

describe('Sign up a user: POST /auth/signup', () => {
  it('should successfully signup a new user', async () => {
    const response = await chai.request(app)
      .post('/api/v1/auth/signup').send(newUser);

    expect(response.status).to.eqls(statusCodes.created);
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

  it('should fail to create a user without a name', async () => {
    const response = await chai.request(app)
      .post('/api/v1/auth/signup').send(newUser2);

    expect(response.status).to.eqls(statusCodes.badRequest);
    expect(response.body.status).to.eqls(statusCodes.badRequest);
    expect(response.body.error).eqls('Validation errors.');
    expect(response.body.fields[0].name).eqls('First name is required.');
  });
});
