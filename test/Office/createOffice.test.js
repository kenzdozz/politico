import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcrypt';
import app from '../../app';
import statusCodes from '../../helpers/statusCode';
import { offices, users } from '../../helpers/mockData';
import { dbQuery } from '../../database';
import * as officeTable from '../../database/migrations/officeTable';
import * as userTable from '../../database/migrations/userTable';
import User from '../../database/models/User';


chai.use(chaiHttp);

const newOffice1 = offices[0];
const newOffice2 = offices[3];
const newUser = { ...users[2], isadmin: true };
let token;

describe('Create a political office: POST /offices', () => {
  before(async () => {
    await dbQuery(officeTable.drop);
    await dbQuery(officeTable.create);
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

  it('should successfully create a new office', async () => {
    const response = await chai.request(app)
      .post('/api/v1/offices').set('authorization', token).send(newOffice1);

    expect(response.status).to.eqls(statusCodes.created);
    expect(response.body).to.be.an('object');
    expect(response.body.status).to.eqls(statusCodes.created);
    expect(response.body.data.id).to.be.a('number');
    expect(response.body.data.name).to.eqls(newOffice1.name);
    expect(response.body.data.type).to.eqls(newOffice1.type);
  });

  it('should fail to create an office with existing name and type', async () => {
    const response = await chai.request(app).post('/api/v1/offices')
      .set('authorization', token).send(newOffice1);

    expect(response.status).to.eqls(statusCodes.conflict);
    expect(response.body.status).to.eqls(statusCodes.conflict);
    expect(response.body.error).eqls('Validation errors.');
    expect(response.body.fields.name).eqls('Office already exists.');
  });

  it('should fail to create an office without a name', async () => {
    const response = await chai.request(app).post('/api/v1/offices')
      .set('authorization', token).send(newOffice2);

    expect(response.status).to.eqls(statusCodes.badRequest);
    expect(response.body.status).to.eqls(statusCodes.badRequest);
    expect(response.body.error).eqls('Validation errors.');
    expect(response.body.fields.name).eqls('Office name is required.');
  });

  it('should fail to create an office without Authorization', async () => {
    const response = await chai.request(app)
      .post('/api/v1/offices').send(newOffice2);

    expect(response.status).to.eqls(statusCodes.unAuthorized);
    expect(response.body.status).to.eqls(statusCodes.unAuthorized);
    expect(response.body.error).eqls('Authorization is required to access this content.');
  });
});
