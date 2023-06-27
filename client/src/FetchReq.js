const url = "http://localhost:4000";

// Get and set todos
export const fetchRequestGetTodos = async () => {
  const response = await fetch(`${url}/todo`); // gettodos
  const data = await response.json();
  return data;
};

// Create Todo, call from Todo.jsx
export const fetchRequestCreateTodo = async (todo) => {
  console.log("fetchRequestCreateTodo...", todo);
  if (todo.title) {
    const response = await fetch(`${url}/todo`, {
      // api call
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    });
    if (!response.ok) {
      throw new Error("Error ", { cause: data.message });
    }
    const data = await response.json();
    return data;
  } else {
    console.log("ERROR: Enter title");
  }
};

// Update todo
export const fetchRequestUpdateTodo = async (todo) => {
  const response = await fetch(`${url}/todo/${todo.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  if (!response.ok) {
    throw new Error("Error ", { cause: data.message });
  }
  const data = await response.json();
  return data;
};

// Delete Todo
export const fetchRequestDeleteTodo = async (todo) => {
  const response = await fetch(`${url}/todo/${todo.id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Error ", { cause: data.message });
  }
  const data = await response.json();
  return data;
};

export const fetchRequestShowCompletedTask = async () => {
  const response = await fetch(`${url}/todo/showdone`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Error ", { cause: data.message });
  }
  const data = await response.json();
  return data;
};

export const fetchRequestDeleteCompletedTodos = async () => {
  const response = await fetch(`${url}/todo/deletedone`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Error ", { cause: data.message });
  }
  const data = await response.json();
  return data;
};

export const fetchRequestDeleteAll = async () => {
  const response = await fetch(`${url}/todo/deleteall`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Error ", { cause: data.message });
  }
  const data = await response.json();
  return data;
};
