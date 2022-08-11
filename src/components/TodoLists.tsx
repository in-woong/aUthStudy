import React, {
  MutableRefObject,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  useRecoilState,
  useRecoilValueLoadable,
  useSetRecoilState,
} from 'recoil';

import { addTodos } from '../service/todos';
import { todoState } from '../store/todos';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { dateState } from '../store/date';

import TodoListLoad from './TodoListLoad';
import PageBtns from './PageBtns';
import TodoImage from './TodoImage';

const TodoLists = (): JSX.Element => {
  const [selectedNum, setSelectedNum] = useState(1);
  const [input, setInput] = useState('');
  const [date, setDate] = useRecoilState(dateState);
  const setTodo = useSetRecoilState(todoState);

  const TodoList = React.lazy(() => import('./TodoList'));
  const todoItemLoadable = useRecoilValueLoadable(todoState);
  const todos = useMemo(() => {
    return todoItemLoadable?.state === 'hasValue'
      ? todoItemLoadable?.contents
      : [];
  }, [todoItemLoadable, date]);

  const pageNums = useMemo(() => {
    let tempTodos =
      todoItemLoadable?.state === 'hasValue' ? todoItemLoadable?.contents : [];
    return Array.from(
      { length: Math.floor(tempTodos.length / 7) + 1 },
      (_, idx) => idx + 1
    );
  }, [todoItemLoadable, date]);

  const handleSubmit = () => {
    addTodos(date, input, todos, setTodo);
    setInput('');
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
          <Suspense fallback={<TodoListLoad />}>
            <TodoList todos={todos} />
          </Suspense>
        </section>
        <TodoImage date={date} />
      </div>
      <PageBtns pageNums={pageNums} />
    </div>
  );
};

export default TodoLists;
