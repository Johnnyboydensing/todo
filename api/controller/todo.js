/** @format */
const db = require("../config/db");

const addTodo = async (req, res) => {
  const { todo_task, user_id } = req.body;
  const sql = "INSERT INTO todos (todo_task,user_id) VALUES (?,?)";

  try {
    await db.query(sql, [todo_task, user_id], async (err, result) => {
      if (err) {
        return res.status(400).send({ msg: "Problem adding todo task" });
      }

      return res.status(200).send({ msg: "Todo task added" });
    });
  } catch (error) {
    return res.status(200).send({ msg: "Problem with server" });
  }
};

const getTodo = async (req, res) => {
  const sql = "SELECT * FROM todos WHERE user_id = ?";

  try {
    await db.query(sql, [req.params.user_id], (err, result) => {
      if (err) {
        
        return res.status(400).send({ msg: "Problem getting your todos" });
      }

      return res.status(200).send({ todos: result });
    });
  } catch (error) {
    return res.status(200).send({ msg: "Problem with server" });
  }
};

const editTodo = async (req, res) => {
  const { todo_task } = req.body;
  const sql = "UPDATE todos SET todo_task = ? WHERE todo_id = ?";

  try {
    await db.query(sql, [todo_task, req.params.todo_id], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(400).send({ msg: "Problem updating your todos" });
      }

      return res.status(200).send({ msg: "Editing success" });
    });
  } catch (error) {
    return res.status(200).send({ msg: "Problem with server" });
  }
};

const deleteTodo = async (req, res) => {
  const sql = "DELETE FROM todos WHERE todo_id = ?";

  try {
    await db.query(sql, [req.params.todo_id], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(400).send({ msg: "Problem deleting your todos" });
      } else {
        return res.status(200).send({ msg: "Deleting success" });
      }
    });
  } catch (error) {
    return res.status(200).send({ msg: "Problem with server" });
  }
};

const deleteMultipleTodo = async (req, res) => {
  const idsa = req.body.todo_id;
  let ids = [];

  const sql = "DELETE FROM todos WHERE todo_id IN(?)";
  try {
    await db.query(sql, [idsa], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(400).send({ msg: "Problem deleting your todos" });
      } else {
        return res.status(200).send({ msg: "Deleting success" });
      }
    });
  } catch (error) {
    return res.status(200).send({ msg: "Problem with server" });
  }
};

module.exports = { getTodo, addTodo, editTodo, deleteTodo, deleteMultipleTodo };
