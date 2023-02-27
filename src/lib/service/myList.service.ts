import dbConnect from '../dbConnection';
import MyListModel, { MyListInput } from './../models/myList.model';

export async function createMyList(input: MyListInput) {
  await dbConnect();

  const result = await MyListModel.create({ ...input });

  return result;
}

export async function getMyLists(uid: string) {
  await dbConnect();

  const result = await MyListModel.find({ uid: uid });

  //todo number of todos

  return result;
}

export async function deleteMyList(listId: string) {
  await dbConnect();

  const result = await MyListModel.deleteOne({ _id: listId });

  return result;
}

export async function updateMyList(listId: string, input: MyListInput) {
  await dbConnect();

  const list = await MyListModel.findOne({ _id: listId });
  list.name = input.name;
  list.color = input.color;
  const savedList = await list.save();

  return savedList;
}
