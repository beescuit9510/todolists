import dbConnect from '../dbConnection';
import TodoModel, { TodoInput } from './../models/todo.model';
import { GetTodosInput } from './../schema/todo.schema';

export async function createTodo(input: TodoInput) {
  await dbConnect();

  const result = await TodoModel.create({ ...input });

  return await TodoModel.findOne({ _id: result._id }).populate('tags');
}

export async function updateTodo(todoId: string, input: TodoInput) {
  await dbConnect();

  const todo = await TodoModel.findOne({ _id: todoId });

  input.taskName && (todo.taskName = input.taskName);
  input.completed && (todo.completed = input.completed);
  input.flagged && (todo.flagged = input.flagged);
  input.notes && (todo.notes = input.notes);
  input.dueDate && (todo.dueDate = input.dueDate);
  input.dueTime && (todo.dueTime = input.dueTime);
  input.list && (todo.list = input.list);
  input.tags && (todo.tags = input.tags);

  await todo.save();

  const result = await TodoModel.findOne({ _id: todoId });

  return result;
}

export async function getTodos(input: GetTodosInput) {
  await dbConnect();

  const { uid, taskName, completed, flagged, notes, dueDate, list, tags } =
    input.query;

  const result = await TodoModel.find({
    $and: [
      { uid: uid },
      taskName ? { $or: [{ taskName: { $regex: taskName } }] } : {},
      completed ? { $or: [{ completed: completed }] } : {},
      flagged ? { $or: [{ flagged: flagged }] } : {},
      notes ? { $or: [{ notes: { $regex: notes } }] } : {},
      dueDate ? { $or: [{ dueDate: { $regex: dueDate } }] } : {},
      list ? { $or: [{ list: list }] } : {},
      tags ? { $or: [{ tags: { $in: tags.split(',') } }] } : {},
    ],
  }).populate('tags');

  return result;
}

export async function countTodos(input: GetTodosInput) {
  await dbConnect();

  const {
    uid,
    taskName,
    completed,
    flagged,
    notes,
    dueDate,
    list,
    tags,
    scheduled,
  } = input.query;

  const result = await TodoModel.find({
    $and: [
      { uid: uid },
      taskName ? { $or: [{ taskName: { $regex: taskName } }] } : {},
      completed ? { $or: [{ completed: completed }] } : {},
      flagged ? { $or: [{ flagged: flagged }] } : {},
      notes ? { $or: [{ notes: { $regex: notes } }] } : {},
      dueDate ? { $or: [{ dueDate: { $regex: dueDate } }] } : {},
      list ? { $or: [{ list: list }] } : {},
      tags ? { $or: [{ tags: { $in: tags.split(',') } }] } : {},
      scheduled ? { $or: [{ dueDate: { $ne: null } }] } : {},
    ],
  }).count();

  return result;
}
export async function deleteTodo(todoId: string) {
  await dbConnect();

  const todo = await TodoModel.findOne({ _id: todoId });

  if (todo) return await todo.delete();
}
