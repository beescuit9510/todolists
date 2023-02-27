import { ColorScheme } from '@/constants/colorScheme';
import { CreateMyTagInput, createMyTagSchema } from '@/lib/schema/myTag.schema';
import { createMyTag } from '@/lib/service/myTag.service';
import validate from '@/lib/validateResource';
import type { NextApiRequest, NextApiResponse } from 'next';

type postData = {
  myTag: any;
};

async function postHandler(
  req: NextApiRequest,
  res: NextApiResponse<postData>
) {
  const input = validate(createMyTagSchema, req, res) as CreateMyTagInput;

  const myTag = await createMyTag({
    ...input.body,
    color: input.body.color as ColorScheme,
  });

  res.status(201).json({ myTag: myTag });
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
