import * as express from 'express';
import { Request, Response } from 'express';

import {  DiseaseModel } from '../models';
import { IControllerBase } from '../interfaces';

class DiseaseController implements IControllerBase {
  public path = '/api/disease';
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes = (): void => {
    this.router.post(`${this.path}/add-disease`, this.addDisease);
    this.router.get(`${this.path}/get-diseases`, this.getDiseases);
  };


  private addDisease = async (req: Request, res: Response) => {
    try {
        const {diseaseType, cardId, recommendations} = req.body;

        const disease = new DiseaseModel({diseaseType: diseaseType, cardId: cardId, recommendations});

        await disease.save();

      return res.status(200).json("success");
    } catch (e) {
      console.log(e);
    }
  };
  private getDiseases = async (req: Request, res: Response) => {
    try {
      const users = await DiseaseModel.find().populate('cardId');
      console.log(users);
      return res.status(200).send(users);
    } catch (e) {
      console.log(e);
    }
  };
}

export default DiseaseController;
