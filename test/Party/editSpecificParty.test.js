import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcrypt';
import app from '../../app';
import statusCodes from '../../helpers/statusCode';
import Party from '../../database/models/Party';
import { parties, users } from '../../helpers/mockData';
import { dbQuery } from '../../database';
import * as partyTable from '../../database/migrations/partyTable';
import * as userTable from '../../database/migrations/userTable';
import User from '../../database/models/User';

chai.use(chaiHttp);

const newUser = { ...users[2], isadmin: true };
let token;
let party;

describe('Get all political parties: GET /parties/<party-id>', () => {
  before(async () => {
    await dbQuery(partyTable.drop);
    await dbQuery(partyTable.create);
    party = await Party.create(parties[4]);
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

  it('should edit a specific party', async () => {
    const response = await chai.request(app).patch(`/api/v1/parties/${party.id}`)
      .set('authorization', token).send({ hqaddress: 'Aso Rock Villa, Abuja' });

    expect(response.status).to.eqls(statusCodes.success);
    expect(response.body).to.be.an('object');
    expect(response.body.status).to.eqls(statusCodes.success);
    expect(response.body.data.name).to.eqls(party.name);
    expect(response.body.data.acronym).to.eqls(party.acronym);
    expect(response.body.data.hqaddress).to.eqls('Aso Rock Villa, Abuja');
    expect(response.body.data.logourl).to.be.a('string');
  });

  it('should fail to edit a party', async () => {
    const response = await chai.request(app).patch('/api/v1/parties/987')
      .set('authorization', token).send({ hqaddress: 'Aso Rock Villa, Abuja' });

    expect(response.status).to.eqls(statusCodes.notFound);
    expect(response.body.status).to.eqls(statusCodes.notFound);
    expect(response.body.error).eqls('Party not found.');
  });

  it('should fail to edit a party without Authorization', async () => {
    const response = await chai.request(app)
      .patch(`/api/v1/parties/${party.id}`);

    expect(response.status).to.eqls(statusCodes.unAuthorized);
    expect(response.body.status).to.eqls(statusCodes.unAuthorized);
    expect(response.body.error).eqls('Authorization is required to access this content.');
  });
});
