import { useEffect, useState } from "react";
import Todo from "./Todo";

const TodoList = ({ todos, updateTodo, deleteTodo }) => {
  return (
    <>
      <div className="todo-list">
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </div>
    </>
  );
};

export default TodoList;
