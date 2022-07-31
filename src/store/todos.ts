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
  finishedAt: null | string;
  imgURL: string;
  //taskId는 Todolists의 id와 동일
}
