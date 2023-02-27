import { ColorScheme } from '../../constants/colorScheme';
import mongoose from 'mongoose';

export interface MyTagInput {
  uid: string;
  name: string;
  color: ColorScheme;
}

export interface MyTagDocument extends MyTagInput, mongoose.Document {}

const MyTagSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  name: { type: String, required: true },
  color: { type: String, required: true },
});

const MyTagModel =
  mongoose.models.MyTag<MyTagInput> ||
  mongoose.model<MyTagDocument>('MyTag', MyTagSchema);

export default MyTagModel;
