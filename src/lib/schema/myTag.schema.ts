import { ColorSchemes } from '@/constants/colorScheme';
import { object, string, TypeOf } from 'zod';
import { ColorScheme } from '../../constants/colorScheme';

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

const searchParams = {
  query: object({
    name: string({
      required_error: 'name is required',
    }).optional(),
  }).merge(query.query),
};

export const createMyTagSchema = object({ ...payload });

export const getMyTagsSchema = object({
  ...searchParams,
});

export const deleteMyTagSchema = object({
  ...query,
});

export type CreateMyTagInput = TypeOf<typeof createMyTagSchema>;
export type GetMyTagsInput = TypeOf<typeof getMyTagsSchema>;
export type DeleteMyTagInput = TypeOf<typeof deleteMyTagSchema>;
