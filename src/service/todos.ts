import { onValue, ref, set } from 'firebase/database';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore';
import { SetterOrUpdater, useRecoilValue } from 'recoil';
import { uid } from 'uid';
import { dateState } from '../store/date';
import { addTodoStore, Todo } from '../store/todos';
import { authService, dbService } from './firebase';

export const getTodos = async (today: Date) => {
  const nowDate = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;
  console.log('getTodos', nowDate);

  if (!authService.currentUser) return;
  const todoSnapShot = await getDocs(
    collection(dbService, `todos/${authService.currentUser.uid}/${nowDate}`)
  );
  let todos: Todo[] = [];
  todoSnapShot.forEach((doc) => {
    todos = [...todos, doc.data() as Todo];
  });
  return todos;
};

export const addTodos = async (
  today: Date,
  todo: string,
  todos: Todo[],
  setTodo: SetterOrUpdater<Todo[]>
) => {
  const nowDate = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;

  const uuid = uid();
  if (!authService.currentUser) return;

  setTodo(addTodoStore(todos, nowDate, todo));

  const todoRef = doc(
    dbService,
    `todos/${authService.currentUser.uid}/${nowDate}/`,
    uuid
  );

  setDoc(todoRef, {
    todo,
    createdAt: nowDate,
    finished: false,
    imgURL: '',
    uuid,
  });
};

export const finishedTodo = async (
  today: Date,
  uuid: string,
  finished: boolean
) => {
  console.log('finished', finished, uuid);
  const nowDate = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;
  if (!authService.currentUser) return;
  const todoRef = doc(
    dbService,
    `todos/${authService.currentUser.uid}/${nowDate}`,
    uuid
  );
  setDoc(
    todoRef,
    {
      finished,
    },
    { merge: true }
  );
};

export const editTodo = async (today: Date, uuid: string, todo: string) => {
  console.log('edit', uuid, todo);
  const nowDate = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;
  if (!authService.currentUser) return;
  const todoRef = doc(
    dbService,
    `todos/${authService.currentUser.uid}/${nowDate}`,
    uuid
  );
  setDoc(
    todoRef,
    {
      todo,
    },
    { merge: true }
  );
};

export const deleteTodo = async (today: Date, uuid: string) => {
  const nowDate = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;
  if (!authService.currentUser) return;
  await deleteDoc(
    doc(dbService, `todos/${authService.currentUser.uid}/${nowDate}`, uuid)
  );
};
