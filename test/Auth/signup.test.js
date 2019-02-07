import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
import app from '../../app';
import statusCodes from '../../helpers/statusCode';
import { users } from '../../helpers/mockData';
import * as usersTable from '../../database/migrations/userTable';
import { dbQuery } from '../../database';

chai.use(chaiHttp);

const newUser = users[0];
const newUser2 = users[1];
delete newUser2.firstname;

describe('Sign up a user: POST /auth/signup', () => {
  before(async () => {
    await dbQuery(usersTable.drop);
    await dbQuery(usersTable.create);
  });

  it('should successfully signup a new user', async () => {
    const response = await chai.request(app).post('/api/v1/auth/signup')
      .field('firstname', newUser.firstname)
      .field('gender', newUser.gender)
      .field('email', newUser.email)
      .field('lastname', newUser.lastname)
      .field('password', newUser.password)
      .field('phonenumber', newUser.phonenumber)
      .attach('passport', fs.readFileSync(`${__dirname}/avatar.jpg`), 'avatar.jpg');

    expect(response.status).to.eqls(statusCodes.created);
    expect(response.body).to.be.an('object');
    expect(response.body.status).to.eqls(statusCodes.created);
    expect(response.body.data.token).to.be.a('string');
    expect(response.body.data.user).to.be.an('object');
    expect(response.body.data.user.firstname).to.eqls(newUser.firstname);
    expect(response.body.data.user.lastname).to.eqls(newUser.lastname);
    expect(response.body.data.user.phonenumber).to.eqls(newUser.phonenumber);
    expect(response.body.data.user.id).to.be.a('number');
  }).timeout(5000);

  it('should fail to create a user without a name', async () => {
    const response = await chai.request(app)
      .post('/api/v1/auth/signup').send(newUser2);

    expect(response.status).to.eqls(statusCodes.badRequest);
    expect(response.body.status).to.eqls(statusCodes.badRequest);
    expect(response.body.error).eqls('Validation errors.');
    expect(response.body.fields[0].firstname).eqls('First name is required.');
  });
});
