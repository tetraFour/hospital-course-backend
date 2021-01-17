import * as express from 'express';
import { Request, Response } from 'express';

import { CardModel, DiseaseModel, DrugModel, UserModel } from '../models';
import { IControllerBase } from '../interfaces';

class CardController implements IControllerBase {
  public path = '/api/card';
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes = (): void => {
    this.router.get(`${this.path}/get-cards`, this.getCards);
    this.router.get(`${this.path}/get-current-card`, this.getCurrentCard);
    this.router.get(`${this.path}/get-user-card`, this.getUserCard);
    this.router.delete(
      `${this.path}/delete-current-card/:id`,
      this.deleteCurrentCard,
    );
  };

  private getCurrentCard = async (req: Request, res: Response) => {
    try {
      const { cardid } = req.query;

      const card = await CardModel.findById(cardid).populate('userId');

      const disease = await DiseaseModel.find({ cardId: card.id });

      return res.status(200).json({ card, disease });
    } catch (e) {
      console.log(e);
    }
  };

  private getUserCard = async (req: Request, res: Response) => {
    try {
      const { userid } = req.query;
      console.log(userid);
      //@ts-ignore
      const card = await CardModel.findOne({ userId: userid }).populate(
        'userId',
      );

      const disease = await DiseaseModel.find({ cardId: card.id });

      return res.status(200).json({ card, disease });
    } catch (e) {
      console.log(e);
    }
  };

  private getCards = async (req: Request, res: Response) => {
    try {
      const users = await CardModel.find().populate('userId');
      console.log(users);
      return res.status(200).send(users);
    } catch (e) {
      console.log(e);
    }
  };
  private deleteCurrentCard = async (req: Request, res: Response) => {
    const { id } = req.params;

    await CardModel.findByIdAndDelete(id);

    return res.status(200).json('success');
  };
}

export default CardController;
