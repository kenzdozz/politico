import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import statusCodes from '../../helpers/statusCode';
import Office from '../../database/models/Office';
import { offices } from '../../helpers/mockData';
import { dbQuery } from '../../database';
import * as officeTable from '../../database/migrations/officeTable';

chai.use(chaiHttp);

describe('Get all political offices: GET /offices', () => {
  before(async () => {
    await dbQuery(officeTable.drop);
    await dbQuery(officeTable.create);
    await Office.create(offices[0]);
    await Office.create(offices[1]);
  });

  it('should return all offices', async () => {
    const response = await chai.request(app)
      .get('/api/v1/offices');

    expect(response.status).to.eqls(statusCodes.success);
    expect(response.body).to.be.an('object');
    expect(response.body.status).to.eqls(statusCodes.success);
    expect(response.body.data.length).to.eqls(2);
    expect(response.body.data[0].name).to.eqls(offices[0].name);
    expect(response.body.data[0].type).to.eqls(offices[0].type);
  });
});
