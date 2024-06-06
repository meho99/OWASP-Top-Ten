import { INestApplication, Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { clearDatabase, initializeDatabase } from '../../test/db';
import { getConfig } from '../config/config';
import { DbModule } from '../db/db.module';
import { setMiddlewares } from '../helpers/setMiddlewares';
import { SecurityLoggingAndMonitoringFailuresDTO } from './security-logging-and-monitoring-failures.dto';
import { SecurityLoggingAndMonitoringFailuresModule } from './security-logging-and-monitoring-failures.module';

const LoggerMock = {
  error: jest.fn(),
  warn: jest.fn(),
  log: jest.fn(),
  debug: jest.fn(),
  verbose: jest.fn(),
};

describe('SecurityLoggingAndMonitoringFailuresController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ load: [getConfig], isGlobal: true }),
        DbModule,
        SecurityLoggingAndMonitoringFailuresModule,
      ],
    })
      .overrideProvider(Logger)
      .useValue(LoggerMock)
      .compile();

    app = module.createNestApplication({
      bodyParser: true,
      logger: ['error', 'warn'],
    });
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
    it('application does not write any logs, so it might be hard to debug and understand problems', async () => {
      const req: SecurityLoggingAndMonitoringFailuresDTO = {
        someField: 'some value',
      };

      await request(app.getHttpServer())
        .post('/security-logging-and-monitoring-failures/broken')
        .set('Content-Type', 'application/json')
        .send(req)
        .expect(500);

      expect(LoggerMock.error).not.toHaveBeenCalled();
      expect(LoggerMock.log).not.toHaveBeenCalled();
    });
  });

  describe('/fixed', () => {
    it('application writes logs, so it is easier to debug and understand problems', async () => {
      const req: SecurityLoggingAndMonitoringFailuresDTO = {
        someField: 'some value',
      };

      await request(app.getHttpServer())
        .post('/security-logging-and-monitoring-failures/fixed')
        .set('Content-Type', 'application/json')
        .send(req)
        .expect(500);

      expect(LoggerMock.log).toHaveBeenCalledWith(
        'Starting request with DTO: {"someField":"some value"}',
        'SecurityLoggingAndMonitoringFailuresService',
      );
      expect(LoggerMock.error).toHaveBeenCalledWith(
        'Error occurred while processing request, Request data: {"someField":"some value"}',
        'SecurityLoggingAndMonitoringFailuresService',
      );
    });
  });
});
