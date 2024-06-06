import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import axios from 'axios';
import request from 'supertest';
import { setMiddlewares } from '../helpers/setMiddlewares';
import { ServerSideRequestForgeryModule } from './server-side-request-forgery.module';

jest.mock('axios', () => {
  return {
    get: jest.fn().mockResolvedValue({ data: { test: 'test' } }),
  };
});

describe('ServerSideRequestForgeryController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ServerSideRequestForgeryModule],
    }).compile();

    app = module.createNestApplication({
      bodyParser: true,
    });
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
    it('application sends a request to an external API without any validation', async () => {
      const { body } = await request(app.getHttpServer())
        .post(
          '/server-side-request-forgery/broken?url=http://localhost:3000/server-side-request-forgery/broken',
        )
        .set('Content-Type', 'application/json')
        .expect(201);

      expect(body).toEqual({ test: 'test' });

      expect(axios.get).toHaveBeenCalledWith(
        'http://localhost:3000/server-side-request-forgery/broken',
      );
    });
  });

  describe('/fixed', () => {
    it('application doesn not allow to pass a URL that does not start with https', async () => {
      const { body } = await request(app.getHttpServer())
        .post(
          '/server-side-request-forgery/fixed?url=http://localhost:3000/server-side-request-forgery/broken',
        )
        .set('Content-Type', 'application/json')
        .expect(400);

      expect(body.message).toBe('URL must start with https');

      expect(axios.get).not.toHaveBeenCalled();
    });

    it('application does not allow localhost URLs', async () => {
      const { body } = await request(app.getHttpServer())
        .post(
          '/server-side-request-forgery/fixed?url=https://localhost:3000/server-side-request-forgery/broken',
        )
        .set('Content-Type', 'application/json')
        .expect(400);

      expect(body.message).toBe('URL cannot contain localhost');

      expect(axios.get).not.toHaveBeenCalled();
    });
  });
});
