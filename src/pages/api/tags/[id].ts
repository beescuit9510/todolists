import { deleteMyTag, getMyTags } from '@/lib/service/myTag.service';
import validate from '@/lib/validateResource';
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  DeleteMyTagInput,
  deleteMyTagSchema,
  GetMyTagsInput,
  getMyTagsSchema,
} from '@/lib/schema/myTag.schema';

type getData = {
  myTags: any[];
};

async function getHandler(req: NextApiRequest, res: NextApiResponse<getData>) {
  const input = validate(getMyTagsSchema, req, res) as GetMyTagsInput;

  const myTags = await getMyTags(input.query.id, input.query.name);

  res.status(200).json({ myTags: myTags });
}

type deleteData = {
  myTag: any;
};

async function deleteHandler(
  req: NextApiRequest,
  res: NextApiResponse<deleteData>
) {
  const input = validate(deleteMyTagSchema, req, res) as DeleteMyTagInput;

  const myTag = await deleteMyTag(input.query.id);

  res.status(204).json({ myTag: myTag });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const requestMethod = req.method;

  switch (requestMethod) {
    case 'GET':
      getHandler(req, res);
      break;

    case 'DELETE':
      deleteHandler(req, res);
      break;
  }
}
