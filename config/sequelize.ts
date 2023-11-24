import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  username: 'pg_david',
  password: 'david',
  database: 'binarcar',
});

export { sequelize };