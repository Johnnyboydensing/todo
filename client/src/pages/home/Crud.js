/** @format */
import axios from "axios";
export const GetTodo = async (params) => {
  try {
    const res = await axios.get(
      `http://localhost:3000/Todos/get-todo/${params}`,
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
      `http://localhost:3000/Todos/add-todo`,
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
      `http://localhost:3000/Todos/edit-todo/${params.todo_id}`,
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
      `http://localhost:3000/Todos/delete-todo/${params}`,
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
      `http://localhost:3000/Todos/delete-multiple-todo`,
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
    const res = await axios.get(`http://localhost:3000/Auth/logout`, {
      withCredentials: true,
    });

    console.log(res);

    return res;
  } catch (error) {
    return error;
  }
};
