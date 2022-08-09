import {
  atom,
  atomFamily,
  selector,
  selectorFamily,
  useRecoilState,
  useRecoilValueLoadable,
} from 'recoil';
import { uid } from 'uid';
import { getTodos } from '../service/todos';
import { dateState } from './date';

export interface TodoState {
  items: Record<string | number, Todo>;
}

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

const replaceItemAtIndex = (
  arr: Todo[],
  index: number,
  newValue: Todo
): Todo[] => {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
};

export const todoState = atom<Todo[]>({
  key: 'todoState',
  default: selector({
    key: 'todos/get',
    get: async ({ get }) => {
      const date = get(dateState);
      const todos = await getTodos(date);
      return todos as Todo[];
    },
  }),
});

export const todoTotal = selector<number[]>({
  key: 'todosTotal',
  get: ({ get }) => {
    const todos = get(todoState);
    const pageNum = Math.floor(Number(todos) / 7);
    const pageArray = Array.from({ length: pageNum }, (_, idx) => idx + 1);
    return pageArray;
  },
});

export const addTodoStore = (todos: Todo[], date: string, todo: string) => {
  return [
    ...todos,
    {
      uuid: uid(),
      todo,
      createdAt: date,
      finished: false,
      imgURL: '',
    },
  ];
};

export const deleteTodoStore = (todos: Todo[], uuid: string) => {
  return todos.filter((todo) => todo.uuid !== uuid);
};

// export const getTodoState = selector<Todo[]>({
//   key: 'todo/get',
//   get: async ({ get }) => {
//     const date = get(dateState);
//     const todos = await getTodos(date);
//     return todos as Todo[];
//   },
//   set: ({ set }, newValue) => {
//     console.log('newValue', newValue);
//     set(todoState, newValue);
//   },
// });
// export const todoItemState = atomFamily<Todo[], string>({
//   key: 'todoItemState',
//   default: selectorFamily({
//     key: 'todoItemState/default',
//     get:
//       () =>
//       async ({ get }) => {
//         const date = get(dateState);
//         const data = await getTodos(date);
//         return data as Todo[];
//       },
//   }),
// });
