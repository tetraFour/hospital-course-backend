import { Schema, model, Document } from 'mongoose';

export interface IDrugsModel extends Document {
  _id: string;
  diseaseId: string;
  name: string;
}

const Drug = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
  },
  diseaseId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Disease',
  },
});

const DrugModel = model<IDrugsModel>('Drug', Drug);

export default DrugModel;
