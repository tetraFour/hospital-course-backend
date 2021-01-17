import * as express from 'express';
import { Request, Response } from 'express';

import { CardModel,  DrugModel } from '../models';
import { IControllerBase } from '../interfaces';

class DrugController implements IControllerBase {
  public path = '/api/drug';
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes = (): void => {
    this.router.get(`${this.path}/get-drugs`, this.getDrugs);
  };


  private getDrugs = async (req: Request, res: Response) => {
    try {
      const users = await DrugModel.find().populate('diseaseId');
      console.log(users);
      // console.log(users);
      console.log(typeof users[0].id);
      //@ts-ignore
      const qwe = await CardModel.findById(users[0].diseaseId.cardId);
      console.log(qwe);
      return res.status(200).send(users);
    } catch (e) {
      console.log(e);
    }
  };


}

export default DrugController;
