import { useState } from "react";
import "./Footer.css";

const Footer = ({
  populateTodos,
  showCompletedTodos,
  deleteCompletedTodos,
  deleteAll,
}) => {
  const [value, setValue] = useState("");

  const handleOnChange = async (e) => {
    setValue(e.target.value);
    if (e.target.value === "show-all") {
      await populateTodos();
    }
    if (e.target.value === "show-done") {
      await showCompletedTodos();
    }
    if (e.target.value === "delete-done") {
      await deleteCompletedTodos();
    }
    if (e.target.value === "delete-all") {
      await deleteAll();
    }
    //   await updateTodo({ ...todo, priority: e.target.value });
  };
  return (
    <>
      <h1>Footer!!</h1>
      <select className="filter-select" value={value} onChange={handleOnChange}>
        <option value="show-all">ShowAll</option>
        <option value="show-done">ShowCompletedTask</option>
        <option value="delete-done">DeleteCompletedTask</option>
        <option value="delete-all">DeleteAll</option>
      </select>
    </>
  );
};
export default Footer;
