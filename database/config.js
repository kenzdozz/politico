
const herokuPg = {
  connectionString: 'postgres://diabpyfbimjuya:c50f60c6ad2f56d26aa449bc5814a3323d4a6e32e544ce26619a4f9868618e18@ec2-54-227-244-12.compute-1.amazonaws.com:5432/d233ill936cr99',
  ssl: true,
};
const database = process.env.ENV === 'test' ? 'politico_test' : 'politico';
const localPg = {
  user: 'kenzdozz',
  host: 'localhost',
  database,
  password: 'chidozie',
  port: 5432,
};
const dbConnObj = process.env.NODE_ENV ? herokuPg : localPg;

export default dbConnObj;
