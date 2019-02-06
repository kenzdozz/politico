import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcrypt';
import app from '../../app';
import statusCodes from '../../helpers/statusCode';
import { users } from '../../helpers/mockData';
import User from '../../database/models/User';
import * as usersTable from '../../database/migrations/userTable';
import { dbQuery } from '../../database';

chai.use(chaiHttp);

const newUser = { ...users[2] };

describe('Login a user: POST /auth/login', () => {
  before(async () => {
    await dbQuery(usersTable.drop);
    await dbQuery(usersTable.create);
    newUser.password = bcrypt.hashSync(newUser.password, 10);
    await User.create(newUser);
  });

  it('should successfully login a user', async () => {
    const response = await chai.request(app)
      .post('/api/v1/auth/login').send({
        email: users[2].email,
        password: users[2].password,
      });

    expect(response.status).to.eqls(statusCodes.success);
    expect(response.body).to.be.an('object');
    expect(response.body.status).to.eqls(statusCodes.success);
    expect(response.body.data.token).to.be.a('string');
    expect(response.body.data.user).to.be.an('object');
    expect(response.body.data.user.firstname).to.eqls(newUser.firstname);
    expect(response.body.data.user.lastname).to.eqls(newUser.lastname);
    expect(response.body.data.user.phoneNumber).to.eqls(newUser.phoneNumber);
    expect(response.body.data.user.id).to.be.a('number');
  });

  it('should fail to login a user with incorrect details', async () => {
    const response = await chai.request(app)
      .post('/api/v1/auth/login').send({
        email: 'random@email.com',
        password: 'Userpassword',
      });

    expect(response.status).to.eqls(statusCodes.unAuthorized);
    expect(response.body.status).to.eqls(statusCodes.unAuthorized);
    expect(response.body.error).eqls('Invalid email address or password.');
  });
});
