/** @format */

const express = require("express");
const route = express.Router();
const {
  getTodo,
  addTodo,
  deleteTodo,
  editTodo,
  deleteMultipleTodo,
} = require("../controller/todo");

route.get("/get-todo/:user_id", getTodo);
route.post("/add-todo", addTodo);
route.delete("/delete-todo/:todo_id", deleteTodo);
route.post("/delete-multiple-todo", deleteMultipleTodo);
route.put("/edit-todo/:todo_id", editTodo);

module.exports = route;
