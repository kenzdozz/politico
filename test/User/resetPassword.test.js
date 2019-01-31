import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import statusCodes from '../../helpers/statusCode';
import { users } from '../../helpers/mockData';
import User from '../../database/models/User';

chai.use(chaiHttp);

const user = users[0];

describe('Request password reset: POST /auth/reset', () => {
  before(async () => {
    await User.create(user);
  });

  it('should successfully send reset password eamil', async () => {
    const response = await chai.request(app)
      .post('/api/v1/auth/reset').send({
        email: user.email,
      });

    expect(response.status).to.eqls(statusCodes.unAuthorized);
    expect(response.body.status).to.eqls(statusCodes.unAuthorized);
    expect(response.body.data[0].message).eqls('Check your email for password reset link.');
    expect(response.body.data[0].email).eqls(user.email);
  });
});
