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
  console.log("updateTodoModel:  id ", id, todo);
  if (!(await client.hExists("todos", id))) throw new Error("Bad request");

  let newTodo = { ...todo };
  await client.hSet("todos", id, JSON.stringify(newTodo));

  const data = await client.hGet("todos", id);
  console.log("updateTodoModel:   data", data);

  return JSON.parse(data);
};

module.exports = {
  getTodoModel,
  createTodoModel,
  updateTodoModel,
};
