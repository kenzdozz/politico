import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcrypt';
import app from '../../app';
import statusCodes from '../../helpers/statusCode';
import Office from '../../database/models/Office';
import { offices, users } from '../../helpers/mockData';
import { dbQuery } from '../../database';
import * as officeTable from '../../database/migrations/officeTable';
import * as userTable from '../../database/migrations/userTable';
import User from '../../database/models/User';

chai.use(chaiHttp);

const newUser = { ...users[2], isadmin: true };
let token;
let office;

describe('Edit a political office: PATCH /offices/<office-id>', () => {
  before(async () => {
    await dbQuery(officeTable.drop);
    await dbQuery(officeTable.create);
    office = await Office.create(offices[1]);
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

  it('should edit a specific office', async () => {
    const response = await chai.request(app).patch(`/api/v1/offices/${office.id}`)
      .set('authorization', token).send({ name: 'Governor' });

    expect(response.status).to.eqls(statusCodes.success);
    expect(response.body).to.be.an('object');
    expect(response.body.status).to.eqls(statusCodes.success);
    expect(response.body.data.type).to.eqls(office.type);
    expect(response.body.data.name).to.eqls('Governor');
  });

  it('should fail to edit a office', async () => {
    const response = await chai.request(app).patch('/api/v1/offices/987')
      .set('authorization', token).send({ name: 'Governor' });

    expect(response.status).to.eqls(statusCodes.notFound);
    expect(response.body.status).to.eqls(statusCodes.notFound);
    expect(response.body.error).eqls('Office not found.');
  });

  it('should fail to edit a office without Authorization', async () => {
    const response = await chai.request(app)
      .patch(`/api/v1/offices/${office.id}`);

    expect(response.status).to.eqls(statusCodes.unAuthorized);
    expect(response.body.status).to.eqls(statusCodes.unAuthorized);
    expect(response.body.error).eqls('Authorization is required to access this content.');
  });
});
