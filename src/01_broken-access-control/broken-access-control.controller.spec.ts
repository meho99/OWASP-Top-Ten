import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { setMiddlewares } from '../helpers/setMiddlewares';
import { BrokenAccessControlModule } from './broken-access-control.module';
import {
  BrokenAccessControlReqDTO,
  BrokenAccessControlResponseDTO,
} from './broken-access-control.dto';
import {
  clearDatabase,
  getRepository,
  initializeDatabase,
} from '../../test/db';
import { User, UserRole } from '../users/users.entity';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from '../db/db.module';
import { getConfig } from '../config/config';

describe('BrokenAccessControlController', () => {
  let app: INestApplication;

  let standardUser: User;
  let adminUser: User;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ load: [getConfig], isGlobal: true }),
        DbModule,
        BrokenAccessControlModule,
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

    standardUser = await getRepository(User).save({
      email: 'standard@user.pl',
      role: UserRole.User,
    });

    adminUser = await getRepository(User).save({
      email: 'admin@user.pl',
      role: UserRole.Admin,
    });
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/broken', () => {
    it('returns success response when user is not admin', async () => {
      const reqBody: BrokenAccessControlReqDTO = {
        email: standardUser.email,
      };

      const { body }: { body: BrokenAccessControlResponseDTO } = await request(
        app.getHttpServer(),
      )
        .post(`/broken-access-control/admin-only/broken`)
        .set('Content-Type', 'application/json')
        .send(reqBody)
        .expect(201);

      expect(body).toEqual({ operationSuccess: true });
    });
  });

  describe('/fixed', () => {
    it('returns success response when user is admin', async () => {
      const reqBody: BrokenAccessControlReqDTO = {
        email: adminUser.email,
      };

      const { body }: { body: BrokenAccessControlResponseDTO } = await request(
        app.getHttpServer(),
      )
        .post(`/broken-access-control/admin-only/fixed`)
        .set('Content-Type', 'application/json')
        .send(reqBody)
        .expect(201);

      expect(body).toEqual({ operationSuccess: true });
    });

    it('returns 403 when user is not admin', async () => {
      const reqBody: BrokenAccessControlReqDTO = {
        email: standardUser.email,
      };

      await request(app.getHttpServer())
        .post(`/broken-access-control/admin-only/fixed`)
        .set('Content-Type', 'application/json')
        .send(reqBody)
        .expect(403);
    });
  });
});
