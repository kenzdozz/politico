import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import statusCodes from '../../helpers/statusCode';
import { dbQuery } from '../../database';
import seeder from '../../database/seeder';
import { createTables, dropTables } from '../../database/migrations';
import users from '../../database/seeder/users';

chai.use(chaiHttp);

let token;

describe('A user can results of election: POST /api/v1/office/<office-id>/result', () => {
  before(async () => {
    try {
      await dbQuery(dropTables);
      await dbQuery(createTables);
      await seeder.seedTable('users');
      await seeder.seedTable('parties');
      await seeder.seedTable('offices');
      await seeder.seedTable('candidates');
      await seeder.seedTable('votes');
    } catch (err) {
      // console.log(err);
    }

    const response = await chai.request(app)
      .post('/api/v1/auth/login').send({
        email: users[0].email,
        password: users[0].password,
      });
    ({ token } = response.body.data);
  });

  it('should successfully return election results', async () => {
    const response = await chai.request(app).post('/api/v1/office/1/result')
      .set('authorization', token).send({});
    console.log(response.body);
    expect(response.status).to.eqls(statusCodes.created);
    expect(response.body.status).to.eqls(statusCodes.created);
    expect(response.body.data.office).eqls(1);
    // expect(response.body.data.candidate).eqls(candidate.id);
    // expect(response.body.data.voter).eqls(user.id);
  });

  after(async () => {
    // console.log(await dbQuery(dropTables));
  });
});
