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
let token; let user;
let party; let office;

describe('Should get candidates: GET /candidates', () => {
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
    admin.password = bcrypt.hashSync(admin.password, 10);
    user = await User.create(newUser);
    await User.create(admin);
    await Candidate.create({
      candidate: user.id,
      office: office.id,
      party: party.id,
      approved: true,
      mandate: 'I will water Lagos State',
    });
    const response = await chai.request(app)
      .post('/api/v1/auth/login').send({
        email: users[3].email,
        password: users[3].password,
      });
    ({ token } = response.body.data);
  });

  it('should get all approved candidate', async () => {
    const response = await chai.request(app).get('/api/v1/candidates')
      .set('authorization', token).send();

    expect(response.status).to.eqls(statusCodes.success);
    expect(response.body.status).to.eqls(statusCodes.success);
    expect(response.body.data).to.be.an('array');
  });

  it('should get all candidate', async () => {
    const response = await chai.request(app).get('/api/v1/candidates/all')
      .set('authorization', token).send();

    expect(response.status).to.eqls(statusCodes.success);
    expect(response.body.status).to.eqls(statusCodes.success);
    expect(response.body.data).to.be.an('array');
  });

  it('should get one candidate', async () => {
    const response = await chai.request(app).get('/api/v1/candidates/1')
      .set('authorization', token).send();

    expect(response.status).to.eqls(statusCodes.success);
    expect(response.body.status).to.eqls(statusCodes.success);
    expect(response.body.data).to.be.an('object');
  });

  it('should get all candidate for an office', async () => {
    const response = await chai.request(app).get(`/api/v1/candidates/${office.id}/office`)
      .set('authorization', token).send();

    expect(response.status).to.eqls(statusCodes.success);
    expect(response.body.status).to.eqls(statusCodes.success);
    expect(response.body.data).to.be.an('array');
  });
});
