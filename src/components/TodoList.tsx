import { Todo } from '../store/todos';
import TodoItem from './TodoItem';

const TodoList = ({ todos }: { todos: Todo[] }) => {
  return (
    <ul>
      {todos.map((todo: Todo) => (
        <TodoItem key={todo.uuid} todo={todo} />
      ))}
    </ul>
  );
};
export default TodoList;
