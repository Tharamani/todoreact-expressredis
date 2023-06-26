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

  // Create Todo, call from Todo.jsx
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
          else {
            // No changes
            return item;
          }
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
      setTodos((prevTodos) =>
        prevTodos.filter((item) => {
          if (item.id !== todo.id) return item;
        })
      );
    } catch (e) {
      console.log("Error: deleteTodo ", e.message);
    }
  };

  const showCompletedTodos = async () => {
    try {
      const response = await fetch(`${url}/todo/showdone`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Error ", { cause: data.message });
      }
      const data = await response.json();
      setTodos(data);
    } catch (e) {
      console.log("Error: showCompletedTodos ", e.message);
    }
  };

  const deleteCompletedTodos = async () => {
    try {
      const response = await fetch(`${url}/todo/deletedone`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error ", { cause: data.message });
      }
      const data = await response.json();
      populateTodos();
    } catch (e) {
      console.log("Error: deleteCompletedTodos ", e.message);
    }
  };

  const deleteAll = async () => {
    try {
      const response = await fetch(`${url}/todo/deleteall`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error ", { cause: data.message });
      }
      const data = await response.json();
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
