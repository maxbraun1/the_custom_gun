import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import 'dotenv/config';
import RedisStore from 'connect-redis';
import { createClient } from 'redis';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.enableCors({
    credentials: true,
    origin: process.env.CLIENT_BASE_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    exposedHeaders: ['set-cookie'],
    preflightContinue: false,
    optionsSuccessStatus: 200,
  });

  // Initialize redis client.
  let redisClient = createClient({
    url: `redis://${process.env.REDIS_USER}:${process.env.REDIS_PASSWORD}@redis-17647.c93.us-east-1-3.ec2.cloud.redislabs.com:17647`,
  });
  redisClient.connect().catch(console.error);

  // Initialize Redis store.
  let redisStore = new RedisStore({
    client: redisClient,
    prefix: 'sess:',
  });

  const domain = process.env.DEV ? {} : { domain: 'thecustomgun.com' };

  app.use(
    session({
      store: redisStore,
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 3600000 * 5,
        ...domain,
      },
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(8000);
}
bootstrap();
