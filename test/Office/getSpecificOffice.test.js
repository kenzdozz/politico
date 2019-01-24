import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import statusCodes from '../../helpers/statusCode';
import Office from '../../database/models/Office';
import { offices } from '../../helpers/mockData';

chai.use(chaiHttp);

let office;
describe('Get a specific political office: GET /offices/<office-id>', () => {
  before(async () => {
    office = await Office.create(offices[0]);
  });

  it('should return a specific office', async () => {
    const response = await chai.request(app)
      .get(`/api/v1/offices/${office.id}`);

    expect(response.status).to.eqls(statusCodes.success);
    expect(response.body).to.be.an('object');
    expect(response.body.status).to.eqls(statusCodes.success);
    expect(response.body.data.length).to.eqls(1);
    expect(response.body.data[0].name).to.eqls(office.name);
    expect(response.body.data[0].type).to.eqls(office.type);
  });

  it('should fail to return an office', async () => {
    const response = await chai.request(app)
      .get('/api/v1/offices/897');

    expect(response.status).to.eqls(statusCodes.notFound);
    expect(response.body.status).to.eqls(statusCodes.notFound);
    expect(response.body.error).eqls('Office not found.');
  });
});
