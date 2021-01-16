import { Schema, model, Document } from 'mongoose';

export interface IUserModel extends Document {
  _id: string;
  name: string;
  email: string;
  login: string;
  password: string;
  role: number;
}

const User = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
  },
  email: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  login: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  password: {
    type: Schema.Types.String,
    required: true,
  },
  role: {
    type: Schema.Types.Number,
    required: true,
  },
});

const UserModel = model<IUserModel>('User', User);

export default UserModel;
