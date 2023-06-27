import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { useState, useEffect } from "react";
import "./App.css";
import Footer from "./components/Footer";
import { Header } from "./components/Header";

import {
  fetchRequestGetTodos,
  fetchRequestCreateTodo,
  fetchRequestUpdateTodo,
  fetchRequestDeleteTodo,
  fetchRequestShowCompletedTask,
  fetchRequestDeleteCompletedTodos,
  fetchRequestDeleteAll,
} from "./FetchReq";

const url = "http://localhost:4000";

function App() {
  const [todos, setTodos] = useState([]);

  //UseEffect
  useEffect(() => {
    populateTodos();
  }, []);

  // Get and set todos
  const populateTodos = async () => {
    setTodos(await fetchRequestGetTodos());
  };

  // Create Todo
  const addTodo = async (todo) => {
    try {
      const data = await fetchRequestCreateTodo(todo);
      setTodos((prevTodos) => [...prevTodos, data.todo]);
    } catch (e) {
      console.log("Error: TodoForm ", e.message);
    }
  };

  // Update todo
  const updateTodo = async (todo) => {
    try {
      const data = await fetchRequestUpdateTodo(todo);
      setTodos((prevTodos) =>
        prevTodos.map((item) => {
          if (item.id === data.todo.id) return data.todo;
          // No changes
          return item;
        })
      );
    } catch (e) {
      console.log("Error: updateTodo ", e.message);
    }
  };

  // Delete Todo
  const deleteTodo = async (todo) => {
    try {
      const data = await fetchRequestDeleteTodo(todo);
      console.log("deleteTodo : ", data.message);
      setTodos((prevTodos) =>
        prevTodos.filter((item) => {
          if (item.id !== todo.id) return item;
        })
      );
    } catch (e) {
      console.log("Error: deleteTodo ", e.message);
    }
  };

  // Show completed todos only
  const showCompletedTodos = async () => {
    try {
      const data = await fetchRequestShowCompletedTask();
      setTodos(data);
    } catch (e) {
      console.log("Error: showCompletedTodos ", e.message);
    }
  };

  //Delete completed todos only
  const deleteCompletedTodos = async () => {
    try {
      const data = await fetchRequestDeleteCompletedTodos();
      console.log("deleteTodo : ", data.message);
      populateTodos();
    } catch (e) {
      console.log("Error: deleteCompletedTodos ", e.message);
    }
  };

  // Delete all todos
  const deleteAll = async () => {
    try {
      const data = await fetchRequestDeleteAll();
      console.log("deleteTodo : ", data.message);
      populateTodos();
    } catch (e) {
      console.log("Error: deleteAll ", e.message);
    }
  };

  return (
    <>
      <div id="header">
        <Header />
      </div>
      <div id="app-container">
        <TodoForm addTodo={addTodo} />
        <TodoList
          todos={todos}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
        />
      </div>
      <div id="footer">
        <Footer
          showCompletedTodos={showCompletedTodos}
          deleteCompletedTodos={deleteCompletedTodos}
          populateTodos={populateTodos}
          deleteAll={deleteAll}
        />
      </div>
    </>
  );
}

export default App;
