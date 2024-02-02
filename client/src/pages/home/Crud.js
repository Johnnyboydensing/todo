/** @format */
import axios from "axios";
export const GetTodo = async (params) => {
  try {
    const res = await axios.get(
      `https://todo-app-y3h8.onrender.com/Todos/get-todo/${params}`,
      {
        withCredentials: true,
      }
    );

    return res;
  } catch (error) {
    return error;
  }
};
export const AddTodo = async (params) => {
  try {
    const res = await axios.post(
      `https://todo-app-y3h8.onrender.com/Todos/add-todo`,
      params,
      { withCredentials: true }
    );

    return res;
  } catch (error) {
    return error;
  }
};
export const EditTodo = async (params) => {
  try {
    const res = await axios.put(
      `https://todo-app-y3h8.onrender.com/Todos/edit-todo/${params.todo_id}`,
      { todo_task: params.todo_task },
      { withCredentials: true }
    );

    return res;
  } catch (error) {
    return error;
  }
};

export const DeleteTodo = async (params) => {
  try {
    const res = await axios.delete(
      `https://todo-app-y3h8.onrender.com/Todos/delete-todo/${params}`,
      { withCredentials: true }
    );

    return res;
  } catch (error) {
    return error;
  }
};

export const DeleteMultipleTodo = async (params) => {
  try {
    const res = await axios.post(
      `https://todo-app-y3h8.onrender.com/Todos/delete-multiple-todo`,
      {
        todo_id: params.map((item) => {
          return item;
        }),
      },
      { withCredentials: true }
    );

    console.log(res);

    return res;
  } catch (error) {
    return error;
  }
};

export const Logout = async (params) => {
  try {
    const res = await axios.get(
      `https://todo-app-y3h8.onrender.com/Auth/logout`,
      {
        withCredentials: true,
      }
    );

    console.log(res);

    return res;
  } catch (error) {
    return error;
  }
};
