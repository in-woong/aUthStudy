import React, { useState } from 'react';
import { finishedTodo } from '../service/todos';
import type { Todo } from '../store/todos';

const TodoList = ({ todo }: { todo: Todo }) => {
  const [isDone, setIsDone] = useState(todo.finished);
  const [isEdit, setIsEdit] = useState(false);
  const [input, setInput] = useState(todo.todo);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleDone = () => {
    finishedTodo(todo.uuid, !isDone);
    setIsDone(!isDone);
    
    
  };

  const handleEdit = () => {
    if (isDone) return;
    setIsEdit(!isEdit);
  };
  const handleSubmit = () => {};

  return (
    <li
      key={todo.uuid}
      className='flex content-center justify-between px-3 my-1'
    >
      {isDone ? (
        <span className='my-auto text-red-500'>
          <s>{todo.todo}</s>
        </span>
      ) : isEdit ? (
        <input
          value={input}
          onChange={handleChange}
          onSubmit={handleSubmit}
          className='w-2/3 bg-transparent focus:outline-none text-gray-400'
        />
      ) : (
        <span className='my-auto'>{todo.todo}</span>
      )}
      <div className=''>
        <button onClick={handleDone} className='btn btn-sm btn-ghost'>
          Done
        </button>
        <button onClick={handleEdit} className='btn btn-sm btn-ghost'>
          Edit
        </button>
      </div>
    </li>
  );
};

export default TodoList;
