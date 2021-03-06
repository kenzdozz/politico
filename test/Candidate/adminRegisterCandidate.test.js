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
import Candidate from '../../database/models/Candidate';

chai.use(chaiHttp);

const admin = { ...users[3], isadmin: true };
const newUser = { ...users[2] };
const newUser2 = { ...users[4] };
let token; let user; let user2;
let party; let office;

describe('Admin should register a candidate: POST /office/register/<office-id>', () => {
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
    newUser2.password = bcrypt.hashSync(newUser2.password, 10);
    admin.password = bcrypt.hashSync(admin.password, 10);
    user = await User.create(newUser);
    user2 = await User.create(newUser2);
    await User.create(admin);
    await Candidate.create({
      candidate: user.id,
      office: office.id,
      party: party.id,
      mandate: 'I will water Lagos State',
    });
    const response = await chai.request(app)
      .post('/api/v1/auth/login').send({
        email: users[3].email,
        password: users[3].password,
      });
    ({ token } = response.body.data);
  });

  it('should successfully approve a candidate', async () => {
    const response = await chai.request(app).post(`/api/v1/office/${user.id}/register/`)
      .set('authorization', token).send({
        party: party.id,
        office: office.id,
      });

    expect(response.status).to.eqls(statusCodes.created);
    expect(response.body.status).to.eqls(statusCodes.created);
    expect(response.body.data.office).eqls(office.id);
    expect(response.body.data.candidate).eqls(user.id);
  });

  it('should successfully create and approve a candidate', async () => {
    const response = await chai.request(app).post(`/api/v1/office/${user2.id}/register/`)
      .set('authorization', token).send({
        party: party.id,
        office: office.id,
      });

    expect(response.status).to.eqls(statusCodes.created);
    expect(response.body.status).to.eqls(statusCodes.created);
    expect(response.body.data.office).eqls(office.id);
    expect(response.body.data.candidate).eqls(user2.id);
  });
});
