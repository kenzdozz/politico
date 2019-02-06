import * as parties from './partyTable';
import * as offices from './officeTable';
import * as users from './userTable';
import * as candidates from './candidateTable';
import * as votes from './voteTable';
import * as petitions from './petitionTable';

const createTables = `
    ${parties.create}
    ${offices.create}
    ${users.create}
    ${candidates.create}
    ${votes.create}
    ${petitions.create}
`;

const dropTables = `
    ${parties.drop}
    ${offices.drop}
    ${users.drop}
    ${candidates.drop}
    ${votes.drop}
    ${petitions.drop}
`;

export { createTables, dropTables };
