import { atom } from 'recoil';
import { v1 } from 'uuid';
import { MyTag } from './myTagsAtom';

export type Todo = {
  _id: string;
  uid: string;
  taskName: string;
  completed?: boolean;
  flagged?: boolean;
  list?: string;
  tags?: MyTag[];
  notes?: string;
  dueDate?: string;
  dueTime?: string;
};

export interface TodosState {
  todos: Todo[];
}

const defaultTodosState: TodosState = {
  todos: [],
};

export const todosState = atom<TodosState>({
  key: `todosState/${v1()}`,
  default: defaultTodosState,
});
