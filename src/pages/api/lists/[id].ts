import { ColorScheme } from '@/constants/colorScheme';
import { MyListInput } from './../../../lib/models/myList.model';
import {
  deleteMyListSchema,
  GetMyListsInput,
  getMyListsSchema,
  DeleteMyListInput,
  updateMyListSchema,
  UpdateMyListInput,
} from '@/lib/schema/myList.schema';
import {
  deleteMyList,
  getMyLists,
  updateMyList,
} from '@/lib/service/myList.service';
import validate from '@/lib/validateResource';
import type { NextApiRequest, NextApiResponse } from 'next';

type getData = {
  myLists: any[];
};

async function getHandler(req: NextApiRequest, res: NextApiResponse<getData>) {
  const input = validate(getMyListsSchema, req, res) as GetMyListsInput;

  const myLists = await getMyLists(input.query.id);

  res.status(200).json({ myLists: myLists });
}

type deleteData = {
  myList: any;
};

async function deleteHandler(
  req: NextApiRequest,
  res: NextApiResponse<deleteData>
) {
  const input = validate(deleteMyListSchema, req, res) as DeleteMyListInput;

  const myList = await deleteMyList(input.query.id);

  res.status(204).json({ myList: myList });
}

type updateData = {
  myList: any;
};

async function updateHandler(
  req: NextApiRequest,
  res: NextApiResponse<updateData>
) {
  const input = validate(updateMyListSchema, req, res) as UpdateMyListInput;

  const myList = await updateMyList(input.query.id, {
    ...input.body,
    color: input.body.color as ColorScheme,
  });

  res.status(200).json({ myList: myList });
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

    case 'POST':
      updateHandler(req, res);
      break;
  }
}
