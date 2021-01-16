import './config/environment.config';
import './config/passport.config';

import express from 'express';
import cors from 'cors';

import App from './app';
import { LoggerMiddleware } from './middleware';
import { UserController } from './controllers';

const app = new App({
  port: parseInt(process.env.PORT as string),
  middlewares: [
    express.json(),
    express.urlencoded({ extended: true }),
    LoggerMiddleware,
    cors({
      origin: process.env.DEVELOPMENT,
    }),
  ],
  controllers: [new UserController()],
});

app.listen();