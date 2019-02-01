import { Pool } from 'pg';
import dbConnectionObj from './config';
import { createTables, dropTables } from './migrations';

const pool = new Pool(dbConnectionObj);

const up = async () => {
  pool.query(createTables).catch((err) => {
    // eslint-disable-next-line no-console
    console.log(err);
  });
};

const down = () => {
  pool.query(dropTables).catch((err) => {
    // eslint-disable-next-line no-console
    console.log(err);
  });
};

const dbQuery = async (query) => {
  const res = await pool.query(query);
  return res;
};

export {
  pool, dbQuery, up, down,
};
