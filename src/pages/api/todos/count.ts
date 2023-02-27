import { GetTodosInput, getTodosSchema } from '@/lib/schema/todo.schema';
import { countTodos, getTodos } from '@/lib/service/todo.service';
import validate from '@/lib/validateResource';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const input = validate(getTodosSchema, req, res) as GetTodosInput;

  const todos = await countTodos(input);

  res.status(200).json({ todos: todos });
}
