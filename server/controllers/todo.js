const { getTodoModel, createTodoModel } = require("../models/todo");

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
    const { title, notes, priority, due_date, is_checked } = req.body;
    console.log("req.body", req.body);

    console.log("isValidTitle", isValidTitle(title));
    if (!isValidTitle(title)) {
      return res.status(400).json({ message: "Bad request" });
    }
    // destructure
    const response = await createTodoModel(
      title,
      notes,
      due_date,
      priority,
      is_checked
    );
    console.log("createTodo controller response >>>>>>>>>>> ", response);

    return res.status(201).json({
      message: "Todo created successfully!",
      todo: response,
    });
  } catch (error) {
    console.log("Error creating todo : ", error.message);
  }
};

module.exports = {
  getTodo,
  createTodo,
};
