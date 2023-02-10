import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';

describe('Categories e2e Test', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  const dtoAdmin = {
    email: 'akbar.6b@gmail.com',
    password: 'password',
  };
  const dtoUser = {
    email: 'rama.akbar@ymail.com',
    password: 'password',
  };

  describe('GET /categories', () => {
    // let token = null;
    // await request(app.getHttpServer())
    //   .post('/auth')
    //   .send({
    //     email: dtoAdmin.email,
    //     password: dtoAdmin.password,
    //   })
    //   .then((res) => {
    //     token = res.body.data.access_token;
    //   });
    // test create using user
    // test create no name
    // test create unique
    // test create success using admin

    // test update using user
    // test update no name
    // test update unique
    // test update success using admin
    it('should return all categories', () => {
      return request(app.getHttpServer())
        .get('/categories')
        .expect(200)
        .expect((res) => {
          if (!('data' in res.body)) {
            throw new Error('Response body should have key "data"');
          }
        });
    });
  });
});
