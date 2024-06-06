import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Config } from '../config/config';

export const DbModule = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: (config: ConfigService<Config>) => {
    const options = config.get('database');
    if (!options) {
      throw new Error('db options not found in config');
    }
    return options;
  },
  inject: [ConfigService],
});
