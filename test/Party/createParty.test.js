import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import statusCodes from '../../helpers/statusCode';
import { parties } from '../../helpers/mockData';
import { dbQuery } from '../../database';
import * as partyTable from '../../database/migrations/partyTable';

chai.use(chaiHttp);

const newParty1 = parties[0];
const newParty2 = parties[1];

describe('Create a political party: POST /parties', () => {
  before(async () => {
    await dbQuery(partyTable.drop);
    await dbQuery(partyTable.create);
  });

  it('should successfully create a new party', async () => {
    const response = await chai.request(app)
      .post('/api/v1/parties').send(newParty1);

    expect(response.status).to.eqls(statusCodes.created);
    expect(response.body).to.be.an('object');
    expect(response.body.status).to.eqls(statusCodes.created);
    expect(response.body.data.id).to.be.a('number');
    expect(response.body.data.name).to.eqls(newParty1.name);
    expect(response.body.data.hqaddress).to.eqls(newParty1.hqAddress);
    expect(response.body.data.logourl).to.be.a('string');
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
    expect(response.body.error).eqls('Validation errors.');
    expect(response.body.fields[0].name).eqls('Party name is required.');
  });
});
