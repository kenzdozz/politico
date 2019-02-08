// import chai, { expect } from 'chai';
// import chaiHttp from 'chai-http';
// import app from '../../app';
// import statusCodes from '../../helpers/statusCode';
// import { dbQuery } from '../../database';
// import seeder from '../../database/seeder';
// import users from '../../database/seeder/users';
// import Candidate from '../../database/models/Candidate';
// import candidates from '../../database/seeder/candidates';
// import * as partyTable from '../../database/migrations/partyTable';
// import * as userTable from '../../database/migrations/userTable';
// import * as officeTable from '../../database/migrations/officeTable';
// import * as voteTable from '../../database/migrations/voteTable';
// import * as candidateTable from '../../database/migrations/candidateTable';
// import Vote from '../../database/models/Vote';
// import votes from '../../database/seeder/votes';

// chai.use(chaiHttp);

// let token;

// describe('A user can see results of election: POST /api/v1/office/<office-id>/result', () => {
//   before(async () => {
//     await dbQuery(partyTable.drop);
//     await dbQuery(partyTable.create);
//     await dbQuery(userTable.drop);
//     await dbQuery(userTable.create);
//     await dbQuery(officeTable.drop);
//     await dbQuery(officeTable.create);
//     await dbQuery(candidateTable.drop);
//     await dbQuery(candidateTable.create);
//     await dbQuery(voteTable.drop);
//     await dbQuery(voteTable.create);
//     await seeder.seedTable('users');
//     await seeder.seedTable('parties');
//     await seeder.seedTable('offices');
//     await Candidate.create(candidates[0]);
//     await Candidate.create(candidates[1]);
//     await Candidate.create(candidates[2]);
//     await Vote.create(votes[0]);
//     await Vote.create(votes[1]);
//     await Vote.create(votes[2]);

//     const response = await chai.request(app)
//       .post('/api/v1/auth/login').send({
//         email: users[0].email,
//         password: users[0].password,
//       });
//     ({ token } = response.body.data);
//   });

//   it('should successfully return election results', async () => {
//     const response = await chai.request(app).post('/api/v1/office/1/result')
//       .set('authorization', token).send({});

//     expect(response.status).to.eqls(statusCodes.success);
//     expect(response.body.status).to.eqls(statusCodes.success);
//   });
// });
