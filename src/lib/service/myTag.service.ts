import dbConnect from '../dbConnection';
import MyTagModel, { MyTagInput } from '../models/myTag.model';

export async function createMyTag(input: MyTagInput) {
  await dbConnect();

  const result = await MyTagModel.create({ ...input });

  return result;
}

export async function getMyTags(uid: string, name: string | undefined) {
  await dbConnect();

  const result = await MyTagModel.find({
    $and: [{ uid: uid }, name ? { $or: [{ name: { $regex: name } }] } : {}],
  });

  return result;
}

export async function deleteMyTag(tagId: string) {
  await dbConnect();

  const result = await MyTagModel.deleteOne({ _id: tagId });

  return result;
}
