import { ColorScheme } from '../../constants/colorScheme';
import mongoose from 'mongoose';

export interface MyListInput {
  uid: string;
  name: string;
  color: ColorScheme;
}

export interface MyListDocument extends MyListInput, mongoose.Document {}

const MyListSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  name: { type: String, required: true },
  color: { type: String, required: true },
});

const MyListModel =
  mongoose.models.MyList<MyListInput> ||
  mongoose.model<MyListDocument>('MyList', MyListSchema);

export default MyListModel;
