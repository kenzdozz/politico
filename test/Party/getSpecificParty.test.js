import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import statusCodes from '../../helpers/statusCode';
import Party from '../../database/models/Party';
import { parties } from '../../helpers/mockData';
import { dbQuery } from '../../database';
import * as partyTable from '../../database/migrations/partyTable';

chai.use(chaiHttp);

let party;
describe('Get all political parties: GET /parties/<party-id>', () => {
  before(async () => {
    await dbQuery(partyTable.drop);
    await dbQuery(partyTable.create);
    party = await Party.create(parties[4]);
  });

  it('should return a specific party', async () => {
    const response = await chai.request(app)
      .get(`/api/v1/parties/${party.id}`);

    expect(response.status).to.eqls(statusCodes.success);
    expect(response.body).to.be.an('object');
    expect(response.body.status).to.eqls(statusCodes.success);
    expect(response.body.data.name).to.eqls(party.name);
    expect(response.body.data.acronym).to.eqls(party.acronym);
    expect(response.body.data.hqaddress).to.eqls(party.hqaddress);
    expect(response.body.data.logourl).to.be.a('string');
  });

  it('should fail to return a party', async () => {
    const response = await chai.request(app)
      .get('/api/v1/parties/897');

    expect(response.status).to.eqls(statusCodes.notFound);
    expect(response.body.status).to.eqls(statusCodes.notFound);
    expect(response.body.error).eqls('Party not found.');
  });
});
