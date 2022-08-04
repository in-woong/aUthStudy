import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { addTodos } from '../service/todos';
import { Todo, todoState } from '../store/todos';
import TodoList from './TodoList';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  useRecoilState,
  useRecoilStateLoadable,
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from 'recoil';
import { dateState } from '../store/date';
import { uid } from 'uid';

const TodoLists = (): JSX.Element => {
  const [selectedNum, setSelectedNum] = useState(1);
  const [input, setInput] = useState('');
  const [date, setDate] = useRecoilState(dateState);
  // const todoLoadable = useRecoilValueLoadable(getTodoState);
  const setTodo = useSetRecoilState(todoState);
  // const setTodos = useSetRecoilState(getTodoState);
  const todoItemLoadable = useRecoilValueLoadable(todoState);

  const todos = useMemo(() => {
    return todoItemLoadable?.state === 'hasValue'
      ? todoItemLoadable?.contents
      : [];
  }, [todoItemLoadable]);

  // const todos = useMemo(() => {
  //   return todoLoadable?.state === 'hasValue' ? todoLoadable?.contents : [];
  // }, [todoLoadable]);

  // useEffect(() => {
  //   console.log('todos', todoItems);
  // }, [todoItems]);

  const defaultImage =
    'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80';

  const pageNums = [1];

  const handleSubmit = () => {
    addTodos(date, input, todos, setTodo);
    setInput('');
    console.log('add todo');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') handleSubmit();
  };

  return (
    <div className='container shadow-xl mx-auto lg:w-[1200px] bg-orange-200 rounded-lg dark:bg-orange-300 dark:text-gray-600 flex-col p-2'>
      <DatePicker
        selected={date}
        onChange={(date: Date) => setDate(date)}
        className='bg-transparent focus:outline-none cursor-pointer font-serif'
      />
      <div className='flex'>
        <section className='w-1/2 mx-auto'>
          <h2 className='text-center font-bold text-2xl'>Todolist</h2>

          <div>
            <input
              type='text'
              value={input}
              placeholder='What will you do?'
              className='lg:w-4/5 w-2/3 ml-4 pl-2 py-1 rounded-lg bg-transparent focus:outline-none border-b-2 border-orange-700'
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onSubmit={handleSubmit}
            />
            <button
              type='submit'
              onClick={handleSubmit}
              className='btn btn-sm btn-outline btn-warning ml-4'
            >
              Add
            </button>
          </div>
          <Suspense fallback={<h1>Loading..</h1>}>
            <ul>
              {todos.map((todo: Todo) => (
                <TodoList key={todo.uuid} todo={todo} />
              ))}
            </ul>
          </Suspense>
        </section>
        <section className='w-1/2'>
          <img
            // src={todos[0].imgURL == undefined ? defaultImage : todos[0].imgURL}
            src={defaultImage}
            alt='todoLists Image'
            className='rounded-lg'
          />
        </section>
      </div>

      <ul className='btn-group mx-auto my-3 w-fit h-fit'>
        {pageNums.map((num) => {
          if (num == selectedNum)
            return (
              <li key={num} className='btn btn-active'>
                {num}
              </li>
            );
          return (
            <li key={num} className='btn'>
              {num}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoLists;
