import { onValue, ref, set } from 'firebase/database';
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
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

export const finishedTodo = async (uuid: string) => {};
