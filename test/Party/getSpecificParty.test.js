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
      .get(`/api/v1/parties/${party.id}`);

    expect(response.status).to.eqls(statusCodes.success);
    expect(response.body).to.be.an('object');
    expect(response.body.status).to.eqls(statusCodes.success);
    expect(response.body.data.length).to.eqls(1);
    expect(response.body.data[0].name).to.eqls(party.name);
    expect(response.body.data[0].acronym).to.eqls(party.acronym);
    expect(response.body.data[0].hqAddress).to.eqls(party.hqAddress);
    expect(response.body.data[0].logoUrl).to.be.a('string');
  });

  it('should fail to return a party', async () => {
    const response = await chai.request(app)
      .get('/api/v1/parties/897');

    expect(response.status).to.eqls(statusCodes.notFound);
    expect(response.body.status).to.eqls(statusCodes.notFound);
    expect(response.body.error).eqls('Party not found.');
  });
});
