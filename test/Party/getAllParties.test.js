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

const newUser = { ...users[2] };
let token;

describe('Get all political parties: GET /parties', () => {
  before(async () => {
    await dbQuery(partyTable.drop);
    await dbQuery(partyTable.create);
    await Party.create(parties[3]);
    await Party.create(parties[4]);
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

  it('should return all parties', async () => {
    const response = await chai.request(app)
      .get('/api/v1/parties').set('authorization', token);

    expect(response.status).to.eqls(statusCodes.success);
    expect(response.body).to.be.an('object');
    expect(response.body.status).to.eqls(statusCodes.success);
    expect(response.body.data.length).to.eqls(2);
    expect(response.body.data[0].name).to.eqls(parties[3].name);
    expect(response.body.data[0].acronym).to.eqls(parties[3].acronym);
    expect(response.body.data[0].hqaddress).to.eqls(parties[3].hqAddress);
    expect(response.body.data[0].logourl).to.be.a('string');
  });

  it('should fail to get all parties without Authorization', async () => {
    const response = await chai.request(app)
      .get('/api/v1/parties');

    expect(response.status).to.eqls(statusCodes.unAuthorized);
    expect(response.body.status).to.eqls(statusCodes.unAuthorized);
    expect(response.body.error).eqls('Authorization is required to access this content.');
  });
});
