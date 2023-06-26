import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { useState, useEffect } from "react";
import "./App.css";
import Footer from "./components/Footer";
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
    // const response = await fetch(`${url}/todo`); // gettodos
    // const data = await response.json();
    setTodos(await fetchRequestGetTodos());
  };

  // Create Todo, call from Todo.jsx
  const addTodo = async (todo) => {
    console.log("addtodo...", todo);
    try {
      // const response = await fetch(`${url}/todo`, {
      //   // api call
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(todo),
      // });
      // if (!response.ok) {
      //   throw new Error("Error ", { cause: data.message });
      // }
      // const data = await response.json();
      // console.log("createtodo: ", data.todo);
      // setTodos((prevTodos) => [...prevTodos, data.todo]);
      // populateTodos();
      const data = await fetchRequestCreateTodo(todo);
      console.log("addtodo... data ", data);
      setTodos((prevTodos) => [...prevTodos, data.todo]);
    } catch (e) {
      console.log("Error: TodoForm ", e.message);
    }
  };

  // Update todo
  const updateTodo = async (todo) => {
    try {
      // const response = await fetch(`${url}/todo/${todo.id}`, {
      //   method: "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(todo),
      // });
      // if (!response.ok) {
      //   throw new Error("Error ", { cause: data.message });
      // }
      // const data = await response.json();
      // console.log("updateTodo: ", data.todo);
      // populateTodos();
      const data = await fetchRequestUpdateTodo(todo);
      console.log("updateTodo... data ", data);
      setTodos((prevTodos) =>
        prevTodos.map((item) => {
          // console.log("update todo ...", item.id, data.todo.id);
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
      // const response = await fetch(`${url}/todo/${todo.id}`, {
      //   method: "DELETE",
      // });
      // if (!response.ok) {
      //   throw new Error("Error ", { cause: data.message });
      // }
      // const data = await response.json();
      // console.log("delete todo", data.message);
      const data = await fetchRequestDeleteTodo(todo);
      console.log("delete todo", data);
      setTodos((prevTodos) =>
        prevTodos.filter((item) => {
          console.log("deleteTodo  ...", item.id, todo.id);
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
      console.log("showCompletedTodos todo", data.length);
      setTodos(data);
      //populateTodos();
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
      console.log("deleteCompletedTodos", data.message, data.todosLength);
      // if (data.todosLength === 0) setTodos(todos);
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
      console.log("deleteAll", data.message);
      populateTodos();
    } catch (e) {
      console.log("Error: deleteAll ", e.message);
    }
  };
  return (
    <>
      <div id="app-container">
        <h1>Todo App</h1>
        <TodoForm addTodo={addTodo} />
        <TodoList
          todos={todos}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
        />
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
