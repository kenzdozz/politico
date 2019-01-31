import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import statusCodes from '../../helpers/statusCode';
import { users, offices, candidates } from '../../helpers/mockData';
import User from '../../database/models/User';
import Office from '../../database/models/Office';
import Candidate from '../../database/models/Candidate';

chai.use(chaiHttp);

let user; let office; let candidate;

describe('User vote a candidate: POST /votes', () => {
  before(async () => {
    user = await User.create(users[0]);
    office = await Office.create(offices[0]);
    candidate = await Candidate.create(candidates[0]);
  });

  it('should successfully vote for a candidate', async () => {
    const response = await chai.request(app)
      .post('/api/v1/votes').send({
        office: office.id,
        candidate: candidate.id,
      });

    expect(response.status).to.eqls(statusCodes.created);
    expect(response.body.status).to.eqls(statusCodes.created);
    expect(response.body.data.office).eqls(office.id);
    expect(response.body.data.candidate).eqls(candidate.id);
    expect(response.body.data.voter).eqls(user.id);
  });
});
