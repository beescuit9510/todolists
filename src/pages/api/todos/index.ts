import {
  CreateTodoInput,
  createTodoSchema,
  GetTodosInput,
  getTodosSchema,
} from '@/lib/schema/todo.schema';
import { createTodo, getTodos } from '@/lib/service/todo.service';
import validate from '@/lib/validateResource';
import type { NextApiRequest, NextApiResponse } from 'next';

type postData = {
  todo: any;
};

async function postHandler(
  req: NextApiRequest,
  res: NextApiResponse<postData>
) {
  console.log(
    '----------------------------------------------------------------'
  );
  console.log(
    '----------------------------------------------------------------'
  );
  console.log(req.body);
  const input = validate(createTodoSchema, req, res) as CreateTodoInput;

  const todo = await createTodo({
    ...input.body,
  });
  console.log(
    '----------------------------------------------------------------'
  );
  console.log(
    '----------------------------------------------------------------'
  );

  res.status(201).json({ todo: todo });
}

type getData = {
  todos: any[];
};

async function getHandler(req: NextApiRequest, res: NextApiResponse<getData>) {
  const input = validate(getTodosSchema, req, res) as GetTodosInput;

  const todos = await getTodos(input);

  res.status(200).json({ todos: todos });
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

    case 'POST':
      postHandler(req, res);
      break;
  }
}
