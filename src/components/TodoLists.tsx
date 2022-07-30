import { useState } from 'react';
import { Todo, todoLists } from '../store/todos';
import TodoList from './TodoList';

const TodoLists = (): JSX.Element => {
  const [selectedNum, setSelectedNum] = useState(1);
  const defaultImage =
    'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80';

  const { plan, image } = todoLists;

  const pageNums = Array.from(
    { length: todoLists.taskDays.length },
    (_, idx) => idx + 1
  );
  console.log(pageNums);
  const listNum: number = 10;

  return (
    <div className='container bg-orange-200 rounded-lg dark:bg-orange-300 dark:text-gray-600 flex-col p-2'>
      <div className='flex'>
        <section className='w-1/2 mx-auto'>
          <h2 className='text-center font-bold text-2xl'>Todolist</h2>
          <h3 className='text-xl font-semibold'>
            {'Today:  '}
            <span className='font-normal'>{plan}</span>
          </h3>
          <ul>
            {todoLists.taskDays.map((taskDay: Todo) => (
              <TodoList key={taskDay.id} taskDay={taskDay} />
            ))}
          </ul>
        </section>
        <section className='w-1/2'>
          <img
            src={image == undefined ? defaultImage : image}
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
