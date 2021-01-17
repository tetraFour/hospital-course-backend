import './config/environment.config';
import './config/passport.config';

import express from 'express';
import cors from 'cors';

import App from './app';
import { LoggerMiddleware } from './middleware';
import {
  UserController,
  CardController,
  DiseaseController,
  DrugController,
  AuthController,
} from './controllers';

const app = new App({
  port: parseInt(process.env.PORT as string),
  middlewares: [
    express.json(),
    express.urlencoded({ extended: true }),
    LoggerMiddleware,
    cors(),
  ],
  controllers: [
    new AuthController(),
    new UserController(),
    new CardController(),
    new DiseaseController(),
    new DrugController(),
  ],
});

app.listen();
