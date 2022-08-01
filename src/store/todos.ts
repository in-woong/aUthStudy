import { atom, selector } from 'recoil';
import { getTodos } from '../service/todos';
import { dateState } from './date';
export interface TodoLists {
  id: number;
  createdAt: string;
  updatedAt: string;
  date: string;
  plan: string;
  image: undefined | string;
  userId: number;
  taskDays: Todo[];
}

export interface Todo {
  uuid: string;
  todo: string;
  createdAt: string;
  finished: boolean;
  imgURL: string;
  //taskId는 Todolists의 id와 동일
}

export const todoState = atom({
  key: 'todoState',
  default: [],
});

export const getTodoState = selector({
  key: 'getTodoState',
  get: async ({ get }) => {
    const date = get(dateState);
    const todos = await getTodos(date);
    return todos;
  },
});
