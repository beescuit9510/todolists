import { ColorScheme } from '@/constants/colorScheme';
import { atom } from 'recoil';
import { v1 } from 'uuid';

export type MyList = {
  _id: string;
  uid: string;
  name: string;
  color: ColorScheme;
  numberOfTodos: number;
};

export interface MyListsState {
  myLists: MyList[];
}

const defaultMyListsState: MyListsState = {
  myLists: [],
};

export const myListsState = atom<MyListsState>({
  key: `myListsState/${v1()}`,
  default: defaultMyListsState,
});
