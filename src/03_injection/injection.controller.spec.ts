import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import {
  clearDatabase,
  getRepository,
  initializeDatabase,
} from '../../test/db';
import { getConfig } from '../config/config';
import { DbModule } from '../db/db.module';
import { setMiddlewares } from '../helpers/setMiddlewares';
import { User, UserRole } from '../users/users.entity';
import { InjectionModule } from './injection.module';

const usersRepo = getRepository(User);

describe('InjectionController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ load: [getConfig], isGlobal: true }),
        DbModule,
        InjectionModule,
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

    await Promise.all([
      usersRepo.save({
        email: 'user1@user.pl',
        role: UserRole.User,
      }),
      usersRepo.save({
        email: 'user2@user.pl',
        role: UserRole.User,
      }),
    ]);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/broken', () => {
    it('application does not have any injection protection', async () => {
      const { body }: { body: User[] } = await request(app.getHttpServer())
        .get(`/injection/broken?email=' OR '1'='1`)
        .set('Content-Type', 'application/json')
        .expect(200);

      expect(body.length).toBe(2);
    });
  });

  describe('/fixed', () => {
    it('returns 0 users if tries to inject', async () => {
      const { body }: { body: User[] } = await request(app.getHttpServer())
        .get(`/injection/fixed?email=' OR '1'='1`)
        .set('Content-Type', 'application/json')
        .expect(200);

      expect(body.length).toEqual(0);
    });
  });
});
