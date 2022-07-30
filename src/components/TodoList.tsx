import type { Todo } from '../store/todos';

const TodoList = ({ taskDay }: { taskDay: Todo }) => {
  return (
    <li
      key={taskDay.id}
      className='flex content-center justify-between px-3 my-1'
    >
      <p className='my-auto'>{taskDay.dayPlan}</p>
      <div className=''>
        <button className='btn btn-sm btn-ghost'>Done</button>
        <button className='btn btn-sm btn-ghost'>Edit</button>
      </div>
    </li>
  );
};

export default TodoList;
