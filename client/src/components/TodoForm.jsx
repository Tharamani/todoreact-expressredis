import { useState } from "react";
import "./TodoForm.css";

const TodoForm = ({ addTodo }) => {
  const [title, setTitle] = useState("");

  const submitForm = async (e) => {
    // Prevent the browser from reloading the page
    e.preventDefault();
    const todo = {
      title,
      notes: "",
      due_date: "",
      priority: "",
      is_checked: false,
    };

    await addTodo(todo);
    setTitle("");
  };

  return (
    <>
      <div className="todo-form">
        <form onSubmit={submitForm}>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button className="todo-form-button" type="submit">
            Add Todo
          </button>
        </form>
      </div>
    </>
  );
};

export default TodoForm;
