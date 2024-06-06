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
import { User } from '../users/users.entity';
import { InsecureDesignModule } from './insecure-design.module';
import { VoteForUserReqDTO, VoteForUserResDTO } from './insecure-design.dto';

const usersRepo = getRepository(User);

describe('InsecureDesignController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ load: [getConfig], isGlobal: true }),
        DbModule,
        InsecureDesignModule,
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
    it('application does not check if user can vote for himself', async () => {
      const user1: User = await usersRepo.save({
        email: 'user1@test.test',
      });

      const req: VoteForUserReqDTO = {
        userEmail: user1.email,
        voteForEmail: user1.email,
      };

      const { body }: { body: VoteForUserResDTO } = await request(
        app.getHttpServer(),
      )
        .post('/insecure-design/vote/broken')
        .set('Content-Type', 'application/json')
        .send(req)
        .expect(201);

      expect(body.votes).toBe(1);
    });

    it('application does not check if user has already voted', async () => {
      const user1: User = await usersRepo.save({
        email: 'user1@test.test',
        hasVoted: true,
      });
      const user2: User = await usersRepo.save({
        email: 'user2@test.test',
      });

      const req: VoteForUserReqDTO = {
        userEmail: user1.email,
        voteForEmail: user2.email,
      };

      await request(app.getHttpServer())
        .post('/insecure-design/vote/broken')
        .set('Content-Type', 'application/json')
        .send(req)
        .expect(201);
    });
  });

  describe('/fixed', () => {
    it('application checks if user can vote for himself', async () => {
      const user1: User = await usersRepo.save({
        email: 'user1@test.test',
      });

      const req: VoteForUserReqDTO = {
        userEmail: user1.email,
        voteForEmail: user1.email,
      };

      const { body } = await request(app.getHttpServer())
        .post('/insecure-design/vote/fixed')
        .set('Content-Type', 'application/json')
        .send(req)
        .expect(400);

      expect(body.message).toBe('User cannot vote for themselves');
    });

    it('application checks if user has already voted', async () => {
      const user1: User = await usersRepo.save({
        email: 'user1@test.test',
        hasVoted: true,
      });

      const user2: User = await usersRepo.save({
        email: 'user2@test.test',
      });

      const req: VoteForUserReqDTO = {
        userEmail: user1.email,
        voteForEmail: user2.email,
      };

      const { body } = await request(app.getHttpServer())
        .post('/insecure-design/vote/fixed')
        .set('Content-Type', 'application/json')
        .send(req)
        .expect(400);

      expect(body.message).toBe('User has already voted');
    });
  });
});
