import { ColorScheme } from '@/constants/colorScheme';
import { createMyList } from '@/lib/service/myList.service';
import validate from '@/lib/validateResource';
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  createMyListSchema,
  CreateMyListInput,
} from '@/lib/schema/myList.schema';

type PostData = {
  myList: any;
};

async function postHandler(
  req: NextApiRequest,
  res: NextApiResponse<PostData>
) {
  const input = validate(createMyListSchema, req, res) as CreateMyListInput;

  const myList = await createMyList({
    ...input.body,
    color: input.body.color as ColorScheme,
  });

  res.status(201).json({ myList: myList });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const requestMethod = req.method;

  switch (requestMethod) {
    case 'POST':
      postHandler(req, res);
      break;
  }
}
