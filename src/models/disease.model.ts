import { Schema, model, Document } from 'mongoose';

export interface IDiseaseModel extends Document {
  _id: string;
  diseaseType: string;
  cardId: string;
}

const Disease = new Schema({
  diseaseType: {
    type: Schema.Types.String,
    required: true,
  },
  cardId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Card',
  },
});

const DiseaseModel = model<IDiseaseModel>('Disease', Disease);

export default DiseaseModel;
