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

const newUser = { ...users[2], isadmin: true };
let token;
let user;

describe('Get a specific user: GET /users/<user-id>', () => {
  before(async () => {
    await dbQuery(userTable.drop);
    await dbQuery(userTable.create);
    newUser.password = bcrypt.hashSync(newUser.password, 10);
    user = await User.create(newUser);
    const response = await chai.request(app)
      .post('/api/v1/auth/login').send({
        email: users[2].email,
        password: users[2].password,
      });
    ({ token } = response.body.data);
  });

  it('should return a specific user', async () => {
    const response = await chai.request(app)
      .get(`/api/v1/users/${user.id}`).set('authorization', token);

    expect(response.status).to.eqls(statusCodes.success);
    expect(response.body).to.be.an('object');
    expect(response.body.status).to.eqls(statusCodes.success);
    expect(response.body.data.firstname).to.eqls(user.firstname);
  });

  it('should fail to return a user', async () => {
    const response = await chai.request(app)
      .get('/api/v1/users/897').set('authorization', token);

    expect(response.status).to.eqls(statusCodes.notFound);
    expect(response.body.status).to.eqls(statusCodes.notFound);
    expect(response.body.error).eqls('User not found.');
  });
});
