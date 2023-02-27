import mongoose from 'mongoose';

export interface TodoInput {
  uid: string;
  taskName: string;
  completed?: boolean;
  flagged?: boolean;
  list?: string;
  tags?: string[];
  notes?: string;
  dueDate?: string;
  dueTime?: string;
}

export interface TodoDocument extends TodoInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const TodoSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  taskName: { type: String, required: true },
  completed: {
    type: Boolean,
    required: true,
    default: () => false,
  },
  flagged: { type: Boolean, required: true, default: () => false },
  list: { type: mongoose.Schema.Types.ObjectId, ref: 'MyList' },
  tags: { type: [mongoose.Schema.Types.ObjectId], ref: 'MyTag' },
  notes: { type: String },
  dueDate: { type: String },
  dueTime: { type: String },
});

const TodoModel =
  mongoose.models.Todo<TodoInput> ||
  mongoose.model<TodoDocument>('Todo', TodoSchema);

export default TodoModel;
