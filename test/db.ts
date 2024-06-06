import { ObjectLiteral } from 'typeorm';
import { dataSource } from '../src/config/config';

export const clearDatabase = async () => {
  await dataSource.manager.transaction(async (tm) => {
    for (const entity of dataSource.entityMetadatas) {
      if (entity.tableType !== 'regular') continue;

      await tm.query(`ALTER TABLE "${entity.tableName}" DISABLE TRIGGER ALL;`);
      await tm
        .createQueryBuilder()
        .delete()
        .from(entity.target)
        .where('1 = 1')
        .execute();

      await tm.query(`ALTER TABLE "${entity.tableName}" ENABLE TRIGGER ALL;`);
    }
  });
};

export const initializeDatabase = async () => {
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }
};

export const getRepository = <T extends ObjectLiteral>(
  ...args: Parameters<typeof dataSource.getRepository<T>>
) => dataSource.getRepository<T>(...args);
