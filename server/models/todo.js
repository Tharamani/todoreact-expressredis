const { client } = require("../config/db.js");

const getTodoModel = async () => {
  let result = await client.hGetAll("todos");
  console.log("getTodoModel: result ", result);
  let todos;
  if (result) {
    todos = Object.entries(result).map((element) => JSON.parse(element[1]));
  }

  return todos;
};

// post all properties
const createTodoModel = async (todo) => {
  await client.incr("id");
  const id = await client.get("id");
  const newTodo = { id, ...todo };
  const result = await client.hSet("todos", id, JSON.stringify(newTodo));

  if (result !== 1) throw new Error("Error creating todo");
  const rTodo = await client.hGet("todos", id);

  console.log("createTodoModel: result rTodo :", rTodo);
  return JSON.parse(rTodo);
};

const updateTodoModel = async (id, todo) => {
  if (!(await client.hExists("todos", id)))
    throw new Error("Failed to update todo");

  const newTodo = { id, ...todo };
  await client.hSet("todos", id, JSON.stringify(newTodo));

  const data = await client.hGet("todos", id);
  console.log("updateTodoModel:   data", data);

  return JSON.parse(data);
};

const deleteTodoModel = async (id) => {
  if (!(await client.hExists("todos", id)))
    throw new Error("Failed to delete todo");

  const result = await client.hDel("todos", id);
  console.log("deleteTodoModel:  result", result);

  if (result !== 1) throw new Error("Error creating todo");
  return JSON.parse(result);
};

const showDoneModel = async () => {
  let result = await client.hGetAll("todos");
  let todos;
  if (result) {
    todos = Object.entries(result).map((element) => {
      if (JSON.parse(element[1]).is_checked === true)
        return JSON.parse(element[1]);
    });
  }

  var filteredTodos = todos.filter(function (el) {
    return el != null;
  });
  // console.log("showDoneModel", todos);
  return filteredTodos;
};

const deleteAllModel = async () => {
  let result = await client.del("todos");
  console.log("deleteAllModel : todos", result);
  return result;
};

const deleteCompletedTask = async (id) => {
  const data = await client.hDel("todos", id);
  if (data === 1) return true;
};

const deleteDoneModel = async () => {
  let result = await client.hGetAll("todos");
  let todos;
  todos = Object.values(result).filter((todo) => {
    if (JSON.parse(todo).is_checked === true) {
      return deleteCompletedTask(JSON.parse(todo).id);
    } else return false;
  });

  return todos;
};

module.exports = {
  getTodoModel,
  createTodoModel,
  updateTodoModel,
  deleteTodoModel,
  showDoneModel,
  deleteAllModel,
  deleteDoneModel,
};
