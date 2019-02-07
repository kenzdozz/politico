import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcrypt';
import app from '../../app';
import statusCodes from '../../helpers/statusCode';
import Party from '../../database/models/Party';
import { parties, users, offices } from '../../helpers/mockData';
import { dbQuery } from '../../database';
import * as partyTable from '../../database/migrations/partyTable';
import * as officeTable from '../../database/migrations/officeTable';
import * as userTable from '../../database/migrations/userTable';
import * as candidateTable from '../../database/migrations/candidateTable';
import User from '../../database/models/User';
import Office from '../../database/models/Office';

chai.use(chaiHttp);

const newUser = { ...users[2], isadmin: true };
let token; let user;
let party; let office;

describe('User express interest: POST /office/register/<office-id>', () => {
  before(async () => {
    await dbQuery(partyTable.drop);
    await dbQuery(partyTable.create);
    await dbQuery(officeTable.drop);
    await dbQuery(officeTable.create);
    await dbQuery(userTable.drop);
    await dbQuery(userTable.create);
    await dbQuery(candidateTable.drop);
    await dbQuery(candidateTable.create);
    office = await Office.create(offices[1]);
    party = await Party.create(parties[4]);
    newUser.password = bcrypt.hashSync(newUser.password, 10);
    user = await User.create(newUser);
    const response = await chai.request(app)
      .post('/api/v1/auth/login').send({
        email: users[2].email,
        password: users[2].password,
      });
    ({ token } = response.body.data);
  });

  it('should successfully register a candidate', async () => {
    const response = await chai.request(app).post(`/api/v1/office/register/${office.id}`)
      .set('authorization', token).send({
        party: party.id,
        mandate: 'I will water Lagos State',
      });

    expect(response.status).to.eqls(statusCodes.created);
    expect(response.body.status).to.eqls(statusCodes.created);
    expect(response.body.data.office).eqls(office.id);
    expect(response.body.data.candidate).eqls(user.id);
  });
});
