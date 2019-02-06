import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import statusCodes from '../../helpers/statusCode';
import { offices } from '../../helpers/mockData';
import { dbQuery } from '../../database';
import * as officeTable from '../../database/migrations/officeTable';


chai.use(chaiHttp);

const newOffice1 = offices[0];
const newOffice2 = offices[3];

describe('Create a political office: POST /offices', () => {
  before(async () => {
    await dbQuery(officeTable.drop);
    await dbQuery(officeTable.create);
  });

  it('should successfully create a new party', async () => {
    const response = await chai.request(app)
      .post('/api/v1/offices').send(newOffice1);

    expect(response.status).to.eqls(statusCodes.created);
    expect(response.body).to.be.an('object');
    expect(response.body.status).to.eqls(statusCodes.created);
    expect(response.body.data.id).to.be.a('number');
    expect(response.body.data.name).to.eqls(newOffice1.name);
    expect(response.body.data.type).to.eqls(newOffice1.type);
  });

  it('should fail to create with existing name and type', async () => {
    const response = await chai.request(app)
      .post('/api/v1/offices').send(newOffice1);

    expect(response.status).to.eqls(statusCodes.conflict);
    expect(response.body.status).to.eqls(statusCodes.conflict);
    expect(response.body.error).eqls('Office already exists.');
  });

  it('should fail to create a party without a name', async () => {
    const response = await chai.request(app)
      .post('/api/v1/offices').send(newOffice2);

    expect(response.status).to.eqls(statusCodes.badRequest);
    expect(response.body.status).to.eqls(statusCodes.badRequest);
    expect(response.body.error).eqls('Validation errors.');
    expect(response.body.fields[0].name).eqls('Office name is required.');
  });
});
