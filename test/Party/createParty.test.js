import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcrypt';
import app from '../../app';
import statusCodes from '../../helpers/statusCode';
import { parties, users } from '../../helpers/mockData';
import { dbQuery } from '../../database';
import * as partyTable from '../../database/migrations/partyTable';
import * as userTable from '../../database/migrations/userTable';
import User from '../../database/models/User';

chai.use(chaiHttp);

const newParty1 = parties[0];
const newParty2 = parties[1];
const newUser = { ...users[2], isadmin: true };
let token;

describe('Create a political party: POST /parties', () => {
  before(async () => {
    await dbQuery(partyTable.drop);
    await dbQuery(partyTable.create);
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

  it('should successfully create a new party', async () => {
    const response = await chai.request(app)
      .post('/api/v1/parties').set('authorization', token).send(newParty1);

    expect(response.status).to.eqls(statusCodes.created);
    expect(response.body).to.be.an('object');
    expect(response.body.status).to.eqls(statusCodes.created);
    expect(response.body.data.id).to.be.a('number');
    expect(response.body.data.name).to.eqls(newParty1.name);
    expect(response.body.data.hqaddress).to.eqls(newParty1.hqAddress);
    expect(response.body.data.logourl).to.be.a('string');
  });

  it('should fail to create a party with existing name', async () => {
    const response = await chai.request(app)
      .post('/api/v1/parties').set('authorization', token).send(newParty1);

    expect(response.status).to.eqls(statusCodes.conflict);
    expect(response.body.status).to.eqls(statusCodes.conflict);
    expect(response.body.error).eqls('Party already exists.');
  });

  it('should fail to create a party without a name', async () => {
    const response = await chai.request(app)
      .post('/api/v1/parties').set('authorization', token).send(newParty2);

    expect(response.status).to.eqls(statusCodes.badRequest);
    expect(response.body.status).to.eqls(statusCodes.badRequest);
    expect(response.body.error).eqls('Validation errors.');
    expect(response.body.fields[0].name).eqls('Party name is required.');
  });

  it('should fail to create a party without Authorization', async () => {
    const response = await chai.request(app)
      .post('/api/v1/parties').send(newParty1);

    expect(response.status).to.eqls(statusCodes.unAuthorized);
    expect(response.body.status).to.eqls(statusCodes.unAuthorized);
    expect(response.body.error).eqls('Authorization is required to access this content.');
  });
});
