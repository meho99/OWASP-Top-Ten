import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { setMiddlewares } from '../helpers/setMiddlewares';
import { IdentificationAndAuthenticationFailuresModule } from './identification-and-authentication-failures.module';
import {
  IdentificationAndAuthenticationFailuresResDTO,
  IdentificationAndAuthenticationFailuresBrokenReqDTO,
  IdentificationAndAuthenticationFailuresFixedReqDTO,
} from './identification-and-authentication-failures.dto';

describe('IdentificationAndAuthenticationFailuresController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [IdentificationAndAuthenticationFailuresModule],
    }).compile();

    app = module.createNestApplication({ bodyParser: true });
    setMiddlewares(app);

    await app.init();
  });

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/broken', () => {
    it('allows short passwords', async () => {
      const reqBody: IdentificationAndAuthenticationFailuresBrokenReqDTO = {
        email: 'test@test.test',
        password: '@Short',
      };

      const { body }: { body: IdentificationAndAuthenticationFailuresResDTO } =
        await request(app.getHttpServer())
          .post(`/identification-and-authentication-failures/sign-up/broken`)
          .set('Content-Type', 'application/json')
          .send(reqBody)
          .expect(201);

      expect(body.message).toBe('User created');
    });

    it('allows passwords without any special characters', async () => {
      const reqBody: IdentificationAndAuthenticationFailuresBrokenReqDTO = {
        email: 'test@test.test',
        password: 'weakpassword',
      };

      await request(app.getHttpServer())
        .post(`/identification-and-authentication-failures/sign-up/broken`)
        .set('Content-Type', 'application/json')
        .send(reqBody)
        .expect(201);
    });
  });

  describe('/fixed', () => {
    it('does not allow short passwords', async () => {
      const reqBody: IdentificationAndAuthenticationFailuresFixedReqDTO = {
        email: 'test@test.test',
        password: '@Short1',
      };

      const { body } = await request(app.getHttpServer())
        .post(`/identification-and-authentication-failures/sign-up/fixed`)
        .set('Content-Type', 'application/json')
        .send(reqBody)
        .expect(400);

      expect(body.message[0]).toBe(
        'password must be longer than or equal to 8 characters',
      );
    });

    it('does not allow passwords without any special characters', async () => {
      const reqBody: IdentificationAndAuthenticationFailuresFixedReqDTO = {
        email: 'test@test.test',
        password: 'weakpassword',
      };

      const { body } = await request(app.getHttpServer())
        .post(`/identification-and-authentication-failures/sign-up/fixed`)
        .set('Content-Type', 'application/json')
        .send(reqBody)
        .expect(400);

      expect(body.message[0]).toBe(
        'Password must contain at least one uppercase letter',
      );
    });
  });
});
