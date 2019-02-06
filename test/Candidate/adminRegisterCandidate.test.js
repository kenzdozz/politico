import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import statusCodes from '../../helpers/statusCode';
import { users, offices } from '../../helpers/mockData';
import User from '../../database/models/User';
import Office from '../../database/models/Office';

chai.use(chaiHttp);

let user; let office;

describe('Admin registers a candidate: POST /office/<user-id>/register', () => {
  before(async () => {
    user = await User.create(users[0]);
    office = await Office.create(offices[0]);
  });

  it('should successfully register a candidate', async () => {
    const response = await chai.request(app)
      .post(`/api/v1/office/${user.id}/register`).send({
        office: office.id,
      });

    expect(response.status).to.eqls(statusCodes.created);
    expect(response.body.status).to.eqls(statusCodes.created);
    expect(response.body.data.office).eqls(office.id);
    expect(response.body.data.user).eqls(user.id);
  });
});
