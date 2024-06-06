import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { clearDatabase, initializeDatabase } from '../../test/db';
import { getConfig } from '../config/config';
import { DbModule } from '../db/db.module';
import { setMiddlewares } from '../helpers/setMiddlewares';
import { SecurityMisconfigurationModule } from './security-misconfiguration.module';

describe('SecurityMisconfigurationController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ load: [getConfig], isGlobal: true }),
        DbModule,
        SecurityMisconfigurationModule,
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
    it('application returns error with stack trace', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/security-misconfiguration/broken')
        .set('Content-Type', 'application/json');

      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('stack');
    });
  });

  describe('/fixed', () => {
    it('application does not return any internal error details', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/security-misconfiguration/fixed')
        .set('Content-Type', 'application/json')
        .expect(500);

      expect(body).toEqual({
        statusCode: 500,
        message: 'Internal Server Error',
      });
    });
  });
});
