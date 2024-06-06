import { join } from 'path';
import { User } from '../users/users.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dbConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User],
  migrations: ['dist/src/migrations/*.js'],
  synchronize: true,
};

export const getConfig = () => ({
  database: dbConfig,
  saltRounds: 10,
});

export type Config = ReturnType<typeof getConfig>;

export const dataSource = new DataSource(getConfig().database);
