import {
  DeleteTodosInput,
  deleteTodosSchema,
  UpdateTodoInput,
  updateTodoSchema,
} from '@/lib/schema/todo.schema';
import { deleteTodo, updateTodo } from '@/lib/service/todo.service';
import validate from '@/lib/validateResource';
import type { NextApiRequest, NextApiResponse } from 'next';

type updateData = {
  todo: any;
};

async function updateHandler(
  req: NextApiRequest,
  res: NextApiResponse<updateData>
) {
  console.log(
    '----------------------------------------------------------------'
  );

  console.log(req.query.id);
  console.log(req.body);

  // const input = validate(updateTodoSchema, req, res) as UpdateTodoInput;

  // console.log(input);

  const todo = await updateTodo(req.query.id as string, req.body);
  console.log(
    '----------------------------------------------------------------'
  );

  res.status(204).json({ todo: todo });
}

type deleteData = {
  todo: any;
};

async function deleteHandler(
  req: NextApiRequest,
  res: NextApiResponse<deleteData>
) {
  const input = validate(deleteTodosSchema, req, res) as DeleteTodosInput;

  console.log(
    '----------------------------------------------------------------'
  );
  console.log(input);

  const todo = await deleteTodo(input.query.id);
  console.log(
    '----------------------------------------------------------------'
  );
  res.status(204).json({ todo: todo });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const requestMethod = req.method;

  switch (requestMethod) {
    case 'PUT':
      updateHandler(req, res);
      break;

    case 'DELETE':
      deleteHandler(req, res);
      break;
  }
}
