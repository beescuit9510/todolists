import { array, boolean, object, string, TypeOf, z } from 'zod';

const payload = {
  body: object({
    uid: string({
      required_error: 'uid is required',
    })
      .trim()
      .min(1),
    taskName: string({
      required_error: 'name is required',
    })
      .trim()
      .min(1),
    completed: boolean().optional().default(false),
    flagged: boolean().optional().default(false),
    list: string({
      required_error: 'list is required',
    }),
    tags: array(string()).optional(),
    notes: string().trim().min(1).optional(),
    dueDate: string()
      .trim()
      .regex(RegExp(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/))
      .optional(),
    dueTime: string()
      .trim()
      .regex(RegExp('^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$'))
      .optional(),
  }),
};

const query = {
  query: object({
    id: string({
      required_error: 'id is required',
    }).min(1),
  }),
};

const searchParams = {
  query: object({
    uid: string({
      required_error: 'id is required',
    })
      .trim()
      .min(1),
    taskName: string().optional(),
    completed: boolean()
      .or(z.enum(['true', 'false']))
      .optional(),
    flagged: boolean()
      .or(z.enum(['true', 'false']))
      .optional(),
    notes: string().optional(),
    list: string().optional(),
    tags: string().optional(),
    dueDate: string()
      .trim()
      .regex(RegExp(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/))
      .optional(),
    scheduled: boolean()
      .or(z.enum(['true', 'false']))
      .optional(),
  }),
};

export const createTodoSchema = object({ ...payload });
export const updateTodoSchema = object({ ...query, ...payload });
export const getTodosSchema = object({ ...searchParams });
export const deleteTodosSchema = object({ ...query });

export type CreateTodoInput = TypeOf<typeof createTodoSchema>;
export type UpdateTodoInput = TypeOf<typeof updateTodoSchema>;
export type GetTodosInput = TypeOf<typeof getTodosSchema>;
export type DeleteTodosInput = TypeOf<typeof deleteTodosSchema>;
