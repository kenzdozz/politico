
const db = {
  local: {
    user: 'kenzdozz',
    host: 'localhost',
    database: process.env.ENV_TEST ? 'politico_test' : 'politico',
    password: 'chidozie',
    port: 5432,
  },
  heroku: {
    connectionString: 'postgres://diabpyfbimjuya:c50f60c6ad2f56d26aa449bc5814a3323d4a6e32e544ce26619a4f9868618e18@ec2-54-227-244-12.compute-1.amazonaws.com:5432/d233ill936cr99',
    ssl: true,
  },
  travis: {
    user: 'postgres',
    host: 'localhost',
    database: 'politico_test',
    password: '',
    port: 5432,
  },
};
const dbConnObj = db[process.env.ENV];

export default dbConnObj;