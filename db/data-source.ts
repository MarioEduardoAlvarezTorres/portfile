import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.HOST,
  port: +process.env.PORT_DB,
  username: process.env.USER_NAME_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.NAME_DB,
  entities: ['dist/**/*.entity.js'],
};

console.log(process.env.HOST);

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
