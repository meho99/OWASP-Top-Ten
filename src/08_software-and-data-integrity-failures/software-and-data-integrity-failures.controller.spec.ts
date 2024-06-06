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
import { SoftwareAndDataIntegrityFailuresModule } from './software-and-data-integrity-failures.module';

const userRepo = getRepository(User);

describe('SoftwareAndDataIntegrityFailuresController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ load: [getConfig], isGlobal: true }),
        DbModule,
        SoftwareAndDataIntegrityFailuresModule,
      ],
    }).compile();

    app = module.createNestApplication({ bodyParser: true });
    setMiddlewares(app);

    await initializeDatabase();

    await app.init();
  });

  beforeEach(async () => {
    clearDatabase();
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/broken', () => {
    it('Request made by a malicious user, outside the frontend app can update a role field and gain admin access', async () => {
      const userBefore = await userRepo.save({
        email: 'test@test.test',
        role: UserRole.User,
      });

      const reqBody = {
        role: UserRole.Admin,
      };

      const { body }: { body: User } = await request(app.getHttpServer())
        .patch(`/software-and-data-integrity-failures/${userBefore.id}/broken`)
        .set('Content-Type', 'application/json')
        .send(reqBody)
        .expect(200);

      expect(body.role).toBe(UserRole.Admin);
    });
  });

  describe('/fixed', () => {
    it('Request made by a malicious user, outside the frontend app cannot update a role field and gain admin access', async () => {
      const userBefore = await userRepo.save({
        email: 'test@test.test',
        role: UserRole.User,
      });

      const reqBody = {
        role: UserRole.Admin,
      };

      const { body } = await request(app.getHttpServer())
        .patch(`/software-and-data-integrity-failures/${userBefore.id}/fixed`)
        .set('Content-Type', 'application/json')
        .send(reqBody)
        .expect(400);

      expect(body.message[0]).toBe('property role should not exist');
    });
  });
});
