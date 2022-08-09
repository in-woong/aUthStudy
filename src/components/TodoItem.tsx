import React, { useMemo, useState } from 'react';
import { useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import { deleteTodo, editTodo, finishedTodo } from '../service/todos';
import { dateState } from '../store/date';
import { Todo, todoState } from '../store/todos';

const TodoItem = ({ todo }: { todo: Todo }) => {
  const [isDone, setIsDone] = useState(todo.finished);
  const [isEdit, setIsEdit] = useState(true);
  const [input, setInput] = useState(todo.todo);
  const date = useRecoilValue(dateState);
  const setTodo = useSetRecoilState(todoState);
  const todoItemLoadable = useRecoilValueLoadable(todoState);

  const todos = useMemo(() => {
    return todoItemLoadable?.state === 'hasValue'
      ? todoItemLoadable?.contents
      : [];
  }, [todoItemLoadable]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleDone = () => {
    finishedTodo(date, todo.uuid, !isDone);
    setIsDone(!isDone);
  };

  const handleEdit = () => {
    if (isDone) return;
    setIsEdit(!isEdit);
  };

  const handleDelete = () => {
    deleteTodo(todos, date, todo.uuid,setTodo);
  };

  const handleSubmit = () => {
    editTodo(date, todo.uuid, input);
    setInput(input);
    setIsEdit(!isEdit);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') handleSubmit();
  };
  return (
    <li
      key={todo.uuid}
      className='flex content-center justify-between px-3 my-1'
    >
      {isDone ? (
        <span className='my-auto text-red-500'>
          <s>{input}</s>
        </span>
      ) : isEdit ? (
        <span className='my-auto'>{input}</span>
      ) : (
        <input
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className='w-2/3 bg-transparent focus:outline-none text-gray-400'
        />
      )}
      <div className=''>
        {isEdit ? (
          <>
            <button onClick={handleDone} className='btn btn-sm btn-ghost'>
              Done
            </button>
            <button onClick={handleEdit} className='btn btn-sm btn-ghost'>
              Edit
            </button>
            <button onClick={handleDelete} className='btn btn-sm btn-ghost'>
              Del
            </button>
          </>
        ) : (
          <button className='btn btn-sm mr-4 ' onClick={handleSubmit}>
            Submit
          </button>
        )}
      </div>
    </li>
  );
};

export default TodoItem;
