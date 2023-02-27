import { ColorScheme } from '@/constants/colorScheme';
import { atom } from 'recoil';
import { v1 } from 'uuid';

export type MyTag = {
  _id: string;
  uid: string;
  name: string;
  color: ColorScheme;
};

export interface MyTagsState {
  myTags: MyTag[];
}

const defaultMyTagsState: MyTagsState = {
  myTags: [],
};

export const myTagsState = atom<MyTagsState>({
  key: `myTagsState/${v1()}`,
  default: defaultMyTagsState,
});
