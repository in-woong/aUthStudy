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

  // const { plan, image } = todoLists;

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
    console.log(todos);
  }, [input]);

  return (
    <div className='container bg-orange-200 rounded-lg dark:bg-orange-300 dark:text-gray-600 flex-col p-2'>
      <div className='flex'>
        <section className='w-1/2 mx-auto'>
          <h2 className='text-center font-bold text-2xl'>Todolist</h2>
          <div>
            <input
              type='text'
              value={input}
              placeholder='What will you do?'
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
            <button
              type='submit'
              onClick={handleSubmit}
              className='btn btn-ghost'
            >
              Add
            </button>
          </div>
          <ul>
            {todos.map((todo: Todo) => (
              <TodoList key={todo.uuid} taskDay={todo} />
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
            return <li className='btn btn-active'>{num}</li>;
          return <li className='btn'>{num}</li>;
        })}
      </ul>
    </div>
  );
};

export default TodoLists;
