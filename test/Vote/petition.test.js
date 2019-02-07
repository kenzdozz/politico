// import chai, { expect } from 'chai';
// import chaiHttp from 'chai-http';
// import app from '../../app';
// import statusCodes from '../../helpers/statusCode';
// import { users, offices, petitions } from '../../helpers/mockData';
// import User from '../../database/models/User';
// import Office from '../../database/models/Office';

// chai.use(chaiHttp);

// let user; let office; let candidate;

// describe('User to send petition: POST /petitions', () => {
//   before(async () => {
//     user = await User.create(users[0]);
//     office = await Office.create(offices[0]);
//   });

//   it('should successfully send a petition', async () => {
//     const response = await chai.request(app)
//       .post('/api/v1/petitions').send(petitions[0]);

//     expect(response.status).to.eqls(statusCodes.created);
//     expect(response.body.status).to.eqls(statusCodes.created);
//     expect(response.body.data.office).eqls(office.id);
//     expect(response.body.data.candidate).eqls(candidate.id);
//     expect(response.body.data.voter).eqls(user.id);
//   });
// });
