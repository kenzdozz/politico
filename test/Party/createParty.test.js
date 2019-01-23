import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import statusCodes from '../../helpers/statusCode';
import { parties } from '../../helpers/mockData';

chai.use(chaiHttp);

describe('Create a political party: POST /parties', () => {
  const newParty1 = parties[0];
  const newParty2 = parties[1];
  delete newParty2.name;

  it('should successfully create a new party', async () => {
    const response = await chai.request(app)
      .post('/api/v1/parties').send(newParty1);

    expect(response.status).to.eqls(statusCodes.created);
    expect(response.body).to.be.an('object');
    expect(response.body.status).to.eqls(statusCodes.created);
    expect(response.body.data[0].id).to.be.a('number');
    expect(response.body.data[0].name).to.eqls(newParty1.name);
    expect(response.body.data[0].acronym).to.eqls(newParty1.acronym);
    expect(response.body.data[0].hqAddress).to.eqls(newParty1.hqAddress);
    expect(response.body.data[0].logoUrl).to.be.a('string');
  });

  it('should fail to create with existing name', async () => {
    const response = await chai.request(app)
      .post('/api/v1/parties').send(newParty1);

    expect(response.status).to.eqls(statusCodes.conflict);
    expect(response.body.status).to.eqls(statusCodes.conflict);
    expect(response.body.error).eqls('Party already exists.');
  });

  it('should fail to create a party without a name', async () => {
    const response = await chai.request(app)
      .post('/api/v1/parties').send(newParty2);

    expect(response.status).to.eqls(statusCodes.badRequest);
    expect(response.body.status).to.eqls(statusCodes.badRequest);
    expect(response.body.error).eqls('Party name is required.');
  });
});
