// import chai, { expect } from 'chai';
// import chaiHttp from 'chai-http';
// import app from '../../app';
// import statusCodes from '../../helpers/statusCode';
// import { dbQuery } from '../../database';
// import seeder from '../../database/seeder';
// import { createTables, dropTables } from '../../database/migrations';
// import users from '../../database/seeder/users';

// chai.use(chaiHttp);

// let token;

// describe('A user can vote a candidate: POST /api/v1/votes', () => {
//   before(async () => {
//     try {
//       await dbQuery(dropTables);
//       await dbQuery(createTables);
//       await seeder.seedTable('users');
//       await seeder.seedTable('parties');
//       await seeder.seedTable('offices');
//       await seeder.seedTable('candidates');
//     } catch (err) {
//       // console.log(err);
//     }

//     const response = await chai.request(app)
//       .post('/api/v1/auth/login').send({
//         email: users[0].email,
//         password: users[0].password,
//       });
//     ({ token } = response.body.data);
//   });

//   it('should successfully vote a candidate', async () => {
//     const response = await chai.request(app).post('/api/v1/votes')
//       .set('authorization', token).send({
//         candidate: 1,
//         office: 1,
//       });

//     expect(response.status).to.eqls(statusCodes.created);
//     expect(response.body.status).to.eqls(statusCodes.created);
//     expect(response.body.data.office).eqls(1);
//     expect(response.body.data.candidate).eqls(1);
//   }).timeout(10000);

//   it('should fail to vote a candidate that does not exist', async () => {
//     const response = await chai.request(app).post('/api/v1/votes')
//       .set('authorization', token).send({
//         candidate: 190,
//         office: 1,
//       });

//     expect(response.status).to.eqls(statusCodes.badRequest);
//     expect(response.body.status).to.eqls(statusCodes.badRequest);
//     expect(response.body.error).eqls('Candidate does not exist. ');
//   });

//   after(async () => {
//     await dbQuery(dropTables);
//   });
// });
