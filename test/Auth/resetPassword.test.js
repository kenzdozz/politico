import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import statusCodes from '../../helpers/statusCode';
import { users } from '../../helpers/mockData';
import User from '../../database/models/User';
import * as usersTable from '../../database/migrations/userTable';
import { dbQuery } from '../../database';

chai.use(chaiHttp);

const user = users[2];
const emailtoken = Math.random().toString(15).substring(2);
let savedUser;
describe('Request password reset: POST /auth/reset', () => {
  before(async () => {
    await dbQuery(usersTable.drop);
    await dbQuery(usersTable.create);
    savedUser = await User.create(user);
  });

  it('should successfully send reset password email', async () => {
    const response = await chai.request(app)
      .post('/api/v1/auth/reset').send({
        email: user.email,
      });

    expect(response.status).to.eqls(statusCodes.success);
    expect(response.body.status).to.eqls(statusCodes.success);
    expect(response.body.data.message).eqls('Check your email for password reset link.');
    expect(response.body.data.email).eqls(user.email);
  }).timeout(5000);

  it('should fail to send reset password email', async () => {
    const response = await chai.request(app)
      .post('/api/v1/auth/reset').send({
        email: 'kkk@fff.coi',
      });

    expect(response.status).to.eqls(statusCodes.badRequest);
    expect(response.body.status).to.eqls(statusCodes.badRequest);
    expect(response.body.error).eqls('User does not exist.');
  });

  it('should reset user password', async () => {
    await User.update(savedUser.id, { emailtoken });
    const response = await chai.request(app)
      .patch('/api/v1/auth/reset/').send({
        email: user.email,
        token: emailtoken,
        password: 'newpass',
      });

    expect(response.status).to.eqls(statusCodes.success);
    expect(response.body.status).to.eqls(statusCodes.success);
    expect(response.body.data.message).eqls('Password changed successfully.');
  });

  it('should fail to reset user password', async () => {
    const response = await chai.request(app)
      .patch('/api/v1/auth/reset/').send({
        email: user.email,
        token: 'kokodojidj',
        password: 'newpass',
      });

    expect(response.status).to.eqls(statusCodes.badRequest);
    expect(response.body.status).to.eqls(statusCodes.badRequest);
    expect(response.body.error).eqls('Invalid email address or token.');
  });
});
