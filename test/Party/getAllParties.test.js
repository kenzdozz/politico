import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import statusCodes from '../../helpers/statusCode';
import Party from '../../database/models/Party';
import { parties } from '../../helpers/mockData';

chai.use(chaiHttp);

describe('Get all political parties: GET /parties', () => {
  before(async () => {
    Party.parties = [];
    await parties.forEach(async (party) => {
      await Party.create(party);
    });
  });

  it('should return all parties', async () => {
    const response = await chai.request(app)
      .get('/api/v1/parties');

    expect(response.status).to.eqls(statusCodes.success);
    expect(response.body).to.be.an('object');
    expect(response.body.status).to.eqls(statusCodes.success);
    expect(response.body.data.length).to.eqls(parties.length);
    expect(response.body.data[0].name).to.eqls(parties[0].name);
    expect(response.body.data[0].acronym).to.eqls(parties[0].acronym);
    expect(response.body.data[0].hqAddress).to.eqls(parties[0].hqAddress);
    expect(response.body.data[0].logoUrl).to.be.a('string');
  });
});
