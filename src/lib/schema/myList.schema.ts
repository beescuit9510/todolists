import { ColorSchemes } from '@/constants/colorScheme';
import { object, string, TypeOf } from 'zod';
import { ColorScheme } from './../../constants/colorScheme';

const payload = {
  body: object({
    uid: string({
      required_error: 'uid is required',
    }).min(1),
    name: string({
      required_error: 'name is required',
    }).min(1),
    color: string({
      required_error: 'color is required',
    }),
  }).refine((data) => ColorSchemes.includes(data.color as ColorScheme), {
    message: 'the provided Color scheme is not supported',
  }),
};

const query = {
  query: object({
    id: string({
      required_error: 'id is required',
    }).min(1),
  }),
};

export const createMyListSchema = object({ ...payload });

export const getMyListsSchema = object({
  ...query,
});

export const deleteMyListSchema = object({
  ...query,
});

export const updateMyListSchema = object({
  ...payload,
  ...query,
});

export type CreateMyListInput = TypeOf<typeof createMyListSchema>;
export type GetMyListsInput = TypeOf<typeof getMyListsSchema>;
export type DeleteMyListInput = TypeOf<typeof deleteMyListSchema>;
export type UpdateMyListInput = TypeOf<typeof updateMyListSchema>;
