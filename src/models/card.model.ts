import { Schema, model, Document } from 'mongoose';

export interface ICardModel extends Document {
  _id: string;
  userId: string;
}

const Card = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

const CardModel = model<ICardModel>('Card', Card);

export default CardModel;
