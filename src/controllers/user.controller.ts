import * as express from 'express';
import { Request, Response } from 'express';

import { CardModel, DiseaseModel, DrugModel, UserModel } from '../models';
import { IControllerBase } from '../interfaces';
import { JWTVerify } from '../utils/jwtVerify.utils';
import bcrypt from 'bcryptjs';

class UserController implements IControllerBase {
  public path = '/api/user';
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes = (): void => {
    this.router.get(`${this.path}/get-users`, this.getUsers);
    // this.router.get(`${this.path}/get-drugs`, this.getDrugs);
    this.router.post(`${this.path}/create-user`, this.createUser);
  };

  private getUsers = async (req: Request, res: Response) => {
    try {
      const users = await UserModel.find();
      console.log(users);
      return res.status(200).send(users);
    } catch (e) {
      console.log(e);
    }
  };
  private createUser = async (req: Request, res: Response) => {
    try {
      const { name, login, email, password, age, address } = req.body;
      const user = await UserModel.findOne({ login });
      if (user) {
        return res.status(400).send('user is already exist');
      }
      const hashPassword = await bcrypt.hash(password, 12);

      const createUser = new UserModel({
        name,
        login,
        email,
        password: hashPassword,
        age,
        address,
        role: 1,
      });
      const finalUser = await createUser.save();

      const card = new CardModel({ userId: finalUser.id });

      await card.save();

      return res.status(200).send('okey');
    } catch (e) {
      console.log(e);
    }
  };



}

export default UserController;
