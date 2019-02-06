import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import statusCodes from '../../helpers/statusCode';
import Office from '../../database/models/Office';
import { offices } from '../../helpers/mockData';
import { dbQuery } from '../../database';
import * as officeTable from '../../database/migrations/officeTable';

chai.use(chaiHttp);

let office;
describe('Get a specific political office: GET /offices/<office-id>', () => {
  before(async () => {
    await dbQuery(officeTable.drop);
    await dbQuery(officeTable.create);
    office = await Office.create(offices[0]);
  });

  it('should return a specific office', async () => {
    const response = await chai.request(app)
      .get(`/api/v1/offices/${office.id}`);

    expect(response.status).to.eqls(statusCodes.success);
    expect(response.body).to.be.an('object');
    expect(response.body.status).to.eqls(statusCodes.success);
    expect(response.body.data.name).to.eqls(office.name);
    expect(response.body.data.type).to.eqls(office.type);
  });

  it('should fail to return an office', async () => {
    const response = await chai.request(app)
      .get('/api/v1/offices/897');

    expect(response.status).to.eqls(statusCodes.notFound);
    expect(response.body.status).to.eqls(statusCodes.notFound);
    expect(response.body.error).eqls('Office not found.');
  });
});
