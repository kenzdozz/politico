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
describe('Delete a political party: GET /parties/<party-id>', () => {
  before(async () => {
    await dbQuery(partyTable.drop);
    await dbQuery(partyTable.create);
    party = await Party.create(parties[4]);
  });

  it('should delete a specific party', async () => {
    const response = await chai.request(app)
      .delete(`/api/v1/parties/${party.id}`);

    expect(response.status).to.eqls(statusCodes.success);
    expect(response.body).to.be.an('object');
    expect(response.body.status).to.eqls(statusCodes.success);
    expect(response.body.data.message).to.eqls('Party deleted successfully.');
  });
});
