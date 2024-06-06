import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { clearDatabase, initializeDatabase } from '../../test/db';
import { getConfig } from '../config/config';
import { DbModule } from '../db/db.module';
import { setMiddlewares } from '../helpers/setMiddlewares';
import { CryptographicFailuresModule } from './cryptographic-failures.module';
import { CryptographicFailuresReqDTO } from './cryptographic-failures.dto';
import { User } from '../users/users.entity';

describe('CryptographicFailuresController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ load: [getConfig], isGlobal: true }),
        DbModule,
        CryptographicFailuresModule,
      ],
    }).compile();

    app = module.createNestApplication({ bodyParser: true });
    setMiddlewares(app);

    await initializeDatabase();
    await app.init();
  });

  beforeEach(async () => {
    await clearDatabase();
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/broken', () => {
    it('application does not encrypt saved password correctly', async () => {
      const req: CryptographicFailuresReqDTO = {
        email: 'test@test.test',
        password: 'test-password123',
      };

      const { body }: { body: User } = await request(app.getHttpServer())
        .post('/cryptographic-failures/add-user/broken')
        .set('Content-Type', 'application/json')
        .send(req)
        .expect(201);

      expect(body.password).toBe('test-password123');
    });
  });

  describe('/fixed', () => {
    it('passwords in the database are properly hashed', async () => {
      const req: CryptographicFailuresReqDTO = {
        email: 'test@test.test',
        password: 'test-password123',
      };

      const { body }: { body: User } = await request(app.getHttpServer())
        .post('/cryptographic-failures/add-user/fixed')
        .set('Content-Type', 'application/json')
        .send(req)
        .expect(201);

      console.log('hashed password: ', body.password);
      expect(body.password).not.toBe('test123');
    });
  });
});
