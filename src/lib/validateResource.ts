import { NextApiRequest, NextApiResponse } from 'next';
import { AnyZodObject } from 'zod';

const validate = (
  schema: AnyZodObject,
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    return schema.parse({
      body: req.body,
      query: req.query,
    });
  } catch (e: any) {
    res.status(400).send(e.errors);
    new Error(e.errors[0].message);
  }
};

export default validate;
