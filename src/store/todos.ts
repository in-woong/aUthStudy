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
  id: number;
  createdAt: string;
  updatedAt: string;
  finishedAt: null | string;
  dayPlan: string;
  taskId: number;
  //taskId는 Todolists의 id와 동일
}

export const todoLists: TodoLists = {
  id: 1,
  createdAt: '2022-07-25',
  updatedAt: '2022-07-25',
  date: '2022-07-25',
  plan: 'test Plan 1',
  image: undefined,
  userId: 1,
  taskDays: [
    {
      id: 1,
      createdAt: '2022-07-25',
      updatedAt: '2022-07-25',
      finishedAt: null,
      dayPlan: 'Study',
      taskId: 1,
    },
    {
      id: 2,
      createdAt: '2022-07-25',
      updatedAt: '2022-07-25',
      finishedAt: null,
      dayPlan: 'Study',
      taskId: 1,
    },
    {
      id: 2,
      createdAt: '2022-07-25',
      updatedAt: '2022-07-25',
      finishedAt: null,
      dayPlan: 'Study',
      taskId: 1,
    },
  ],
};
