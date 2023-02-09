import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';

describe('Auth e2e Test', () => {
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

  const dto = {
    email: 'rama.akbar@ymail.com',
    username: 'akbarrama',
    password: 'password',
    passwordConfirmation: 'password',
  };

  describe('POST /auth/register (Register)', () => {
    it('should throw error if email empty', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({
          username: dto.username,
          password: dto.password,
          passwordConfirmation: dto.passwordConfirmation,
        })
        .expect(400);
    });
    it('should throw error if email already registered', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: 'akbar.6b@gmail.com',
          username: 'ramaakbar',
          password: 'password',
          passwordConfirmation: 'password',
        })
        .expect(400);
    });
    it('should throw error if username already registered', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: 'rama.akbar@ymail.com',
          username: 'ramaakbar',
          password: 'password',
          passwordConfirmation: 'password',
        })
        .expect(400);
    });
    it('should throw error if password do not match', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: dto.email,
          username: dto.username,
          password: dto.password,
          passwordConfirmation: 'passwordtest',
        })
        .expect(400);
    });
    it('should register', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send(dto)
        .expect(201);
    });
  });

  describe('POST /auth/ (Login)', () => {
    it('should throw error if email empty', () => {
      return request(app.getHttpServer())
        .post('/auth')
        .send({
          // email: dto.email,
          password: dto.password,
        })
        .expect(400);
    });
    it('should throw error if email not registered', () => {
      return request(app.getHttpServer())
        .post('/auth')
        .send({
          email: 'akbar.akbar@akbar.com',
          password: dto.password,
        })
        .expect(401);
    });
    it('should throw error if password not match', () => {
      return request(app.getHttpServer())
        .post('/auth')
        .send({
          email: dto.email,
          password: 'testtest',
        })
        .expect(401);
    });

    it('should login', () => {
      return request(app.getHttpServer())
        .post('/auth')
        .send({
          email: dto.email,
          password: dto.password,
        })
        .expect(201);
    });
  });

  describe('GET /auth/me', () => {
    it('should throw error if not logged in', () => {
      return request(app.getHttpServer()).get('/auth/me').expect(401);
    });

    it('should return user info if logged in', async () => {
      let token = null;
      await request(app.getHttpServer())
        .post('/auth')
        .send({
          email: dto.email,
          password: dto.password,
        })
        .then((res) => {
          token = res.body.data.access_token;
        });

      return request(app.getHttpServer())
        .get('/auth/me')
        .set('Authorization', `Bearer ${token}`)
        .send()
        .expect(200);
    });
  });
});
