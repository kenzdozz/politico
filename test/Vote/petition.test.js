import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcrypt';
import app from '../../app';
import statusCodes from '../../helpers/statusCode';
import { offices, petitions } from '../../helpers/mockData';
import User from '../../database/models/User';
import Office from '../../database/models/Office';
import { dbQuery } from '../../database';
import * as userTable from '../../database/migrations/userTable';
import * as officeTable from '../../database/migrations/officeTable';
import * as petitionTable from '../../database/migrations/petitionTable';
import users from '../../database/seeder/users';

chai.use(chaiHttp);

let user; let office; let token;
const newUser = { ...users[0] };

describe('User to send petition: POST /petitions', () => {
  before(async () => {
    await dbQuery(petitionTable.drop);
    await dbQuery(petitionTable.create);
    await dbQuery(userTable.drop);
    await dbQuery(userTable.create);
    await dbQuery(officeTable.drop);
    await dbQuery(officeTable.create);
    newUser.password = bcrypt.hashSync(newUser.password, 10);
    user = await User.create(newUser);
    office = await Office.create(offices[0]);

    const response = await chai.request(app)
      .post('/api/v1/auth/login').send({
        email: users[0].email,
        password: users[0].password,
      });
    ({ token } = response.body.data);
  });

  it('should successfully send a petition', async () => {
    const response = await chai.request(app).post('/api/v1/petitions')
      .set('authorization', token).send(petitions[0]);

    expect(response.status).to.eqls(statusCodes.created);
    expect(response.body.status).to.eqls(statusCodes.created);
    expect(response.body.data.office).eqls(office.id);
    expect(response.body.data.createdby).eqls(user.id);
  });
});
