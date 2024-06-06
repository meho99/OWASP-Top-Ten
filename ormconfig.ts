import { getConfig } from './src/config/config';
import { DataSource } from 'typeorm';

export default new DataSource(getConfig().database);
