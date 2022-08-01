import React, { useEffect, useMemo, useState } from 'react';
import { addTodos, getTodos } from '../service/todos';
import { getTodoState, Todo } from '../store/todos';
import TodoList from './TodoList';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { dateState } from '../store/date';

const TodoLists = (): JSX.Element => {
  const [selectedNum, setSelectedNum] = useState(1);
  const [input, setInput] = useState('');
  const [startDate, setStartDate] = useRecoilState(dateState);
  const getTodos = useRecoilValueLoadable(getTodoState);

  const todos = useMemo(() => {
    return getTodos?.state === 'hasValue' ? getTodos?.contents : [];
  }, [getTodos]);

  const defaultImage =
    'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80';

  useEffect(() => {
    console.log(startDate);
  }, [startDate]);
  const pageNums = [1];
  // Array.from(
  //   { length: todoLists.taskDays.length },
  //   (_, idx) => idx + 1
  // );

  const listNum: number = 10;

  const handleSubmit = () => {
    addTodos(startDate, input);
    setInput('');
    console.log('add todo');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // useEffect(() => {
  //   getTodos(startDate).then((todos) => {
  //     if (!todos) return;
  //     setTodos(todos);
  //   });
  //   //TODO: 쓰로틀링이나, 디바운싱 걸어놓기
  // }, [input]);

  return (
    <div className='container shadow-xl mx-auto lg:w-[1200px] bg-orange-200 rounded-lg dark:bg-orange-300 dark:text-gray-600 flex-col p-2'>
      <DatePicker
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
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
          <ul>
            {(todos as Todo[]).map((todo: Todo) => (
              <TodoList key={todo.uuid} todo={todo} />
            ))}
          </ul>
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
