import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import statusCodes from '../../helpers/statusCode';
import Party from '../../database/models/Party';
import { parties } from '../../helpers/mockData';
import { dbQuery } from '../../database';
import * as partyTable from '../../database/migrations/partyTable';

chai.use(chaiHttp);

describe('Get all political parties: GET /parties', () => {
  before(async () => {
    await dbQuery(partyTable.drop);
    await dbQuery(partyTable.create);
    await Party.create(parties[3]);
    await Party.create(parties[4]);
  });

  it('should return all parties', async () => {
    const response = await chai.request(app)
      .get('/api/v1/parties');

    expect(response.status).to.eqls(statusCodes.success);
    expect(response.body).to.be.an('object');
    expect(response.body.status).to.eqls(statusCodes.success);
    expect(response.body.data.length).to.eqls(2);
    expect(response.body.data[0].name).to.eqls(parties[3].name);
    expect(response.body.data[0].acronym).to.eqls(parties[3].acronym);
    expect(response.body.data[0].hqaddress).to.eqls(parties[3].hqAddress);
    expect(response.body.data[0].logourl).to.be.a('string');
  });
});
