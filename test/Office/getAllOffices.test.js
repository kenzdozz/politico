import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import statusCodes from '../../helpers/statusCode';
import Office from '../../database/models/Office';
import { offices } from '../../helpers/mockData';

chai.use(chaiHttp);

describe('Get all political offices: GET /offices', () => {
  before(async () => {
    Office.offices = [];
    await offices.forEach(async (office) => {
      await Office.create(office);
    });
  });

  it('should return all offices', async () => {
    const response = await chai.request(app)
      .get('/api/v1/offices');

    expect(response.status).to.eqls(statusCodes.success);
    expect(response.body).to.be.an('object');
    expect(response.body.status).to.eqls(statusCodes.success);
    expect(response.body.data.length).to.eqls(offices.length);
    expect(response.body.data[0].name).to.eqls(offices[0].name);
    expect(response.body.data[0].type).to.eqls(offices[0].type);
  });
});
