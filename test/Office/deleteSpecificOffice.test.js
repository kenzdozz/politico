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

describe('Delete a political office: DELETE /offices/<office-id>', () => {
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

  it('should delete a specific office', async () => {
    const response = await chai.request(app)
      .delete(`/api/v1/offices/${office.id}`).set('authorization', token);

    expect(response.status).to.eqls(statusCodes.success);
    expect(response.body).to.be.an('object');
    expect(response.body.status).to.eqls(statusCodes.success);
    expect(response.body.data.message).to.eqls('Office deleted successfully.');
  });

  it('should fail to delete a office without Authorization', async () => {
    const response = await chai.request(app)
      .delete(`/api/v1/offices/${office.id}`);

    expect(response.status).to.eqls(statusCodes.unAuthorized);
    expect(response.body.status).to.eqls(statusCodes.unAuthorized);
    expect(response.body.error).eqls('Authorization is required to access this content.');
  });
});
