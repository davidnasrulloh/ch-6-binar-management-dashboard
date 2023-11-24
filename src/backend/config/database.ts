import knex from 'knex';

const database = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'david',
    database: 'postgres',
  },
  searchPath: ['binarcar'], // schema
});

export default database;
