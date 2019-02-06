
const db = {
  development: {
    user: process.env.PG_USER || 'postgres',
    host: process.env.PG_HOST || 'localhost',
    database: process.env.ENV_TEST ? process.env.PG_DB_TEST : process.env.PG_DB,
    password: process.env.PG_PASSWORD || '',
    port: process.env.PG_PORT || 5432,
  },
  heroku: {
    connectionString: process.env.DATABASE_URI,
    ssl: true,
  },
};
const env = process.env.ENV === 'heroku' ? 'heroku' : 'development';
const dbConnObj = db[env];

export default dbConnObj;
