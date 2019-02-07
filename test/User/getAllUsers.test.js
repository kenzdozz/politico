import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcrypt';
import app from '../../app';
import statusCodes from '../../helpers/statusCode';
import { users } from '../../helpers/mockData';
import { dbQuery } from '../../database';
import * as userTable from '../../database/migrations/userTable';
import User from '../../database/models/User';

chai.use(chaiHttp);

const newUser = { ...users[2] };
let token;

describe('Get all political parties: GET /parties', () => {
  before(async () => {
    await dbQuery(userTable.drop);
    await dbQuery(userTable.create);
    newUser.password = bcrypt.hashSync(newUser.password, 10);
    await User.create(newUser);
    const response = await chai.request(app)
      .post('/api/v1/auth/login').send({
        email: users[2].email,
        password: users[2].password,
      });
    ({ token } = response.body.data);
  });

  it('should return all users', async () => {
    const response = await chai.request(app)
      .get('/api/v1/users').set('authorization', token);

    expect(response.status).to.eqls(statusCodes.success);
    expect(response.body).to.be.an('object');
    expect(response.body.status).to.eqls(statusCodes.success);
    expect(response.body.data.length).to.eqls(1);
    expect(response.body.data[0].email).to.eqls(users[2].email);
  });

  it('should fail to get all users without Authorization', async () => {
    const response = await chai.request(app)
      .get('/api/v1/users');

    expect(response.status).to.eqls(statusCodes.unAuthorized);
    expect(response.body.status).to.eqls(statusCodes.unAuthorized);
    expect(response.body.error).eqls('Authorization is required to access this content.');
  });
});
