import { onValue, ref, set } from 'firebase/database';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore';
import { uid } from 'uid';
import { Todo } from '../store/todos';
import { authService, dbService } from './firebase';

export const getTodos = async () => {
  const today = new Date();
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

export const addTodos = async (todo: string) => {
  const today = new Date();
  const nowDate = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;
  console.log(nowDate);
  if (!authService.currentUser) return;
  const uuid = uid();
  const todoRef = doc(
    dbService,
    `todos/${authService.currentUser.uid}/${nowDate}/`,
    uuid
  );

  setDoc(todoRef, {
    todo,
    createdAt: '2022-07-12',
    finished: false,
    imgURL: '',
    uuid,
  });
};

export const finishedTodo = async (uuid: string, finished: boolean) => {
  console.log('finished', finished, uuid);
  const today = new Date();
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

export const editTodo = async (uuid: string, todo: string) => {
  console.log('edit', uuid, todo);
  const today = new Date();
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

export const deleteTodo = async (uuid: string) => {
  const today = new Date();
  const nowDate = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;
  if (!authService.currentUser) return;
  await deleteDoc(
    doc(dbService, `todos/${authService.currentUser.uid}/${nowDate}`, uuid)
  );
};
