import React, { useEffect, useState } from 'react';
import { addTodos, getTodos } from '../service/todos';
import { Todo } from '../store/todos';
import TodoList from './TodoList';

const TodoLists = (): JSX.Element => {
  const [selectedNum, setSelectedNum] = useState(1);
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const defaultImage =
    'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80';

  const pageNums = [1];
  // Array.from(
  //   { length: todoLists.taskDays.length },
  //   (_, idx) => idx + 1
  // );

  const listNum: number = 10;

  const handleSubmit = () => {
    addTodos(input);
    setInput('');
    console.log('add todo');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    getTodos().then((todos) => {
      if (!todos) return;
      setTodos(todos);
    });
    //TODO: 쓰로틀링이나, 디바운싱 걸어놓기
  }, [input]);

  return (
    <div className='container mx-auto lg:w-[1200px] bg-orange-200 rounded-lg dark:bg-orange-300 dark:text-gray-600 flex-col p-2'>
      <div className='flex'>
        <section className='w-1/2 mx-auto'>
          <h2 className='text-center font-bold text-2xl'>Todolist</h2>
          <div>
            <input
              type='text'
              value={input}
              placeholder='What will you do?'
              className='w-4/5 ml-4 pl-2 py-1 rounded-lg bg-transparent focus:outline-none border-b-2 border-orange-700'
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
            {todos.map((todo: Todo) => (
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
