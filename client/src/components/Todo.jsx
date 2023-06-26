import { useState } from "react";
import "./Todo.css";

const Todo = ({ todo, updateTodo, deleteTodo }) => {
  // console.log("Todo : todo", todo);

  const [title, setTitle] = useState(todo.title);
  const [isChecked, setIsChecked] = useState(todo.is_checked);
  const [notes, setNotes] = useState(todo.notes);
  const [priority, setPriority] = useState(todo.priority);
  const [dueDate, setDueDate] = useState(todo.due_date);
  const [toggle, setToggle] = useState(false);

  const deleteTodoById = async () => {
    await deleteTodo(todo);
  };

  return (
    <>
      <div className="todo-item-intial-render">
        <input
          className="todo-checkbox"
          type="checkbox"
          checked={isChecked}
          onChange={(e) => {
            setIsChecked(e.target.checked);
          }}
          onBlur={async (e) => {
            setIsChecked(e.target.checked);
            await updateTodo({ ...todo, is_checked: e.target.checked });
          }}
        />
        <input
          className="todo-input"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          onClick={(e) => {
            setToggle(!toggle);
          }}
          onBlur={async (e) => {
            if (e.target.value) setTitle(e.target.value);
            await updateTodo({ ...todo, title: e.target.value });
          }}
        />
      </div>
      {toggle && (
        <div className="todo-item-show-hide">
          <textarea
            className="text-area"
            value={notes}
            onChange={(e) => {
              setNotes(e.target.value);
            }}
            onBlur={async (e) => {
              if (e.target.value) setNotes(e.target.value);
              await updateTodo({ ...todo, notes: e.target.value });
            }}
          />

          <select
            className="todo-select"
            value={priority}
            onChange={(e) => {
              setPriority(e.target.value);
            }}
            onBlur={async (e) => {
              setPriority(e.target.value);
              await updateTodo({ ...todo, priority: e.target.value });
            }}
          >
            <option value="select">Select</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <input
            className="todo-date"
            type="date"
            value={dueDate}
            onChange={(e) => {
              setDueDate(e.target.value);
            }}
            onBlur={async (e) => {
              setDueDate(e.target.value);
              await updateTodo({ ...todo, due_date: e.target.value });
            }}
          ></input>
          <button onClick={deleteTodoById}>Delete</button>
        </div>
      )}
    </>
  );
};
export default Todo;
