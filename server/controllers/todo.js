const {
  getTodoModel,
  createTodoModel,
  updateTodoModel,
  deleteTodoModel,
  showDoneModel,
  deleteAllModel,
  deleteDoneModel,
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

//Delete todo
const deleteTodo = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("deleteTodo controller id >>>>>>>>>>> ", id);

    const response = await deleteTodoModel(id);
    console.log("deleteTodo controller response >>>>>>>>>>> ", response);

    return res.json({
      message: "Todo deleted successfully!",
    });
  } catch (error) {
    console.log("Error deleteTodo todo : ", error.message);
    if (error.message === "Failed to delete todo") {
      return res.status(404).json({ message: "Resource not found" });
    } else {
      console.log("Error deleteTodo todo : ", error.message);
      return res
        .status(500)
        .json({ message: "Something went wrong, please try later" });
    }
  }
};

// Show done
const showDone = async (req, res) => {
  try {
    const response = await showDoneModel();
    console.log("showDone controller response >>>>>>>>>>> ", response);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete all
const deleteAll = async (req, res) => {
  try {
    const response = await deleteAllModel();
    console.log(
      "deleteAll controller response >>>>>>>>>>> ",
      response,
      response < 0,
      response === 0
    );

    if (response === 0) {
      return res.status(200).json({
        message: "No data to delete ",
      });
    }

    return res.status(200).json({
      message: "Todo all done deleted successfully!",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete todo based on is_checked attribute
const deleteDone = async (req, res) => {
  try {
    const response = await deleteDoneModel();
    console.log(
      "deleteTodo controller response >>>>>>>>>>> ",
      response,
      response < 0
    );

    if (response === 0) {
      return res.status(200).json({
        message: "No data to delete done",
      });
    }

    return res.status(200).json({
      message: "Todo done deleted successfully!",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTodo,
  createTodo,
  editTodo,
  deleteTodo,
  showDone,
  deleteAll,
  deleteDone,
};
