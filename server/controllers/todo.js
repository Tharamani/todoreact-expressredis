const {
  getTodoModel,
  createTodoModel,
  updateTodoModel,
} = require("../models/todo");

//Validate title
const isValidTitle = (title) => {
  if (!title || typeof title !== "string") {
    return false;
  }
  return true;
};

// Get todo
const getTodo = async (req, res) => {
  try {
    const response = await getTodoModel();
    console.log("getTodo controller response >>>>>>>>>>> ", response);
    // return res.status(200).json(response)
    return res.json(response); // 200 status is default
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Create todo
const createTodo = async (req, res) => {
  try {
    if (!isValidTitle(req.body.title)) {
      return res.status(400).json({ message: "Bad request" });
    }

    const response = await createTodoModel(req.body);
    console.log("createTodo controller response >>>>>>>>>>> ", response);

    return res.status(201).json({
      message: "Todo created successfully!",
      todo: response,
    });
  } catch (error) {
    console.log("Error creating todo : ", error.message);
  }
};

// Edit todo
const editTodo = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("editTodo", id);

    const response = await updateTodoModel(id, req.body);
    console.log("editTodo controller response >>>>>>>>>>> ", response);

    return res.json({
      message: "Todo updated successfully!",
      todo: response,
    });
  } catch (error) {
    console.log("Error updating todo : ", error.message);
    if (error.message === "Failed to update todo") {
      return res.status(404).json({ message: "Resource not found" });
    } else {
      console.log("Error deleteTodo todo : ", error.message);

      return res
        .status(500)
        .json({ message: "Something went wrong, please try later" });
    }
  }
};

module.exports = {
  getTodo,
  createTodo,
  editTodo,
};
