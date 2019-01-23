import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import statusCodes from '../../helpers/statusCode';
import { offices } from '../../helpers/mockData';

chai.use(chaiHttp);

describe('Create a political office: POST /offices', () => {
  const newOffice1 = offices[0];
  const newOffice2 = offices[1];
  delete newOffice2.name;

  it('should successfully create a new party', async () => {
    const response = await chai.request(app)
      .post('/api/v1/offices').send(newOffice1);

    expect(response.status).to.eqls(statusCodes.created);
    expect(response.body).to.be.an('object');
    expect(response.body.status).to.eqls(statusCodes.created);
    expect(response.body.data[0].id).to.be.a('number');
    expect(response.body.data[0].name).to.eqls(newOffice1.name);
    expect(response.body.data[0].type).to.eqls(newOffice1.type);
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
    expect(response.body.error).eqls('Party name is required.');
  });
});
