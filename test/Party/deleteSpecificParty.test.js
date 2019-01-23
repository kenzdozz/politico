import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import statusCodes from '../../helpers/statusCode';
import Party from '../../database/models/Party';
import { parties } from '../../helpers/mockData';

chai.use(chaiHttp);

let party;
describe('Get all political parties: GET /parties/<party-id>', () => {
  before(async () => {
    party = await Party.create(parties[0]);
  });

  it('should return a specific party', async () => {
    const response = await chai.request(app)
      .delete(`/api/v1/parties/${party.id}`);

    expect(response.status).to.eqls(statusCodes.noContent);
    expect(response.body).to.be.an('object');
    expect(response.body.status).to.eqls(statusCodes.noContent);
    expect(response.body.data.length).to.eqls(1);
    expect(response.body.data[0].message).to.eqls('Party deleted successfully.');
  });
});
