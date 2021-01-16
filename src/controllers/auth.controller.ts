import * as express from 'express';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

import { UserModel } from '../models';
import { IControllerBase } from '../interfaces';
import { signInValidation, signUpValidation } from '../validations';

class AuthController implements IControllerBase {
  public path = '/api/auth';
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes = (): void => {
    this.router.post(`${this.path}/sign-in`, signInValidation, this.signIn);
    this.router.post(`${this.path}/sign-up`, signUpValidation, this.signUp);
    this.router.get(`${this.path}/logout`, this.logout);
  };

  private signIn = async (req: Request, res: Response) => {
    const { login, password } = req.body;
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'некорректные данные при входе в аккаунт',
        });
      }

      const user = await UserModel.findOne({ login });

      if (!user) {
        return res.status(400).json({ message: 'пользователь не найден' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ message: 'неверный пароль! попробуйте снова.' });
      }

      const token = jwt.sign(
        { login: user.login, userId: user.id },
        <string>process.env.JWT_SECRET,
      );
      return res.status(200).json({
        login: user.login,
        userId: user.id,
        token,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'что-то пошло не так! попробуйте снова.' });
    }
  };

  private signUp = async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'некорректные данные при регистрации',
        });
      }
      const { login, email, password, repeatPassword, gender } = req.body;

      if (password !== repeatPassword) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'пароли не совпадают',
        });
      }

      const candidate = await UserModel.findOne({ login });

      if (candidate) {
        return res
          .status(400)
          .json({ message: 'такой пользователь уже существует!' });
      }

      const hashPassword = await bcrypt.hash(password, 12);

      const user = new UserModel({
        name: 'username',
        login,
        email,
        gender,
        password: hashPassword,
      });

      await user.save();

      return res.status(201).json({ message: 'пользователь создан!', user });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'что-то пошло не так! попробуйте снова.' });
    }
  };

  private logout = (req: Request, res: Response) => {
    return res
      .clearCookie('ut')
      .status(200)
      .send('logout!');
  };
}

export default AuthController;
