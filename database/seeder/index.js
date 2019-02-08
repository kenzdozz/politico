
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-await-in-loop */
import bcrypt from 'bcrypt';
import candidates from './candidates';
import offices from './offices';
import parties from './parties';
import petitions from './petitions';
import users from './users';
import votes from './votes';
import Model from '../models/Model';

const data = {
  users,
  offices,
  parties,
  candidates,
  petitions,
  votes,
};

const seedTable = async (table) => {
  await data[table].forEach(async (dataItem) => {
    const item = { ...dataItem };
    if (table === 'users') item.password = bcrypt.hashSync(item.password, 10);
    const model = new Model(table);
    await model.create(item);
  });
};

const seedAllTables = async () => {
  for (const table in data) {
    await data[table].forEach(async (dataItem) => {
      const item = { ...dataItem };
      if (table === 'users') item.password = bcrypt.hashSync(item.password, 10);
      const model = new Model(table);
      await model.create(item);
    });
  }
};


export default { seedTable, seedAllTables };
