const { client } = require("../app.js");

const getTodoModel = async () => {
  let todosModel = await client.hGetAll("todos");
  console.log(JSON.stringify(todosModel, null, 2));
};

// post all properties
const createTodoModel = async (
  title,
  notes,
  due_date,
  priority,
  is_checked
) => {
  // console.log('createTodoModel : >>>>>>>>', title, notes, dueDate, priority, isChecked)
  const todo = {
    title,
    notes,
    due_date,
    priority,
    is_checked,
  };
  console.log("createTodoModel: todo ", todo);
  const result = await client.hSet("todo", todo);

  console.log("createTodoModel: result ", result);
};

module.exports = {
  getTodoModel,
  createTodoModel,
};
