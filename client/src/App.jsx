/** @format */

import "./App.css";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
  Navigate,
  Outlet,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const loggedInUser = async () => {
  try {
    const res = await axios.get(
      "https://todo-app-y3h8.onrender.com/Auth/is-auth",
      {
        withCredentials: true,
      }
    );

    return res;
  } catch (error) {
    const err = error.response;
    return err;
  }
};

function App() {
  const { data: loggedUser } = useQuery({
    queryKey: ["logged-user"],
    queryFn: loggedInUser,
  });

  const route = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route
          path='/'
          element={
            <IsAuth loggedUser={loggedUser}>
              <Home loggedUser={loggedUser} />
            </IsAuth>
          }
        />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Route>
    )
  );

  return <RouterProvider router={route} />;
}

const IsAuth = ({ loggedUser, children }) => {
  if (loggedUser?.data.isValid === false) {
    return <Navigate to='/login' />;
  }

  return children;
};

export default App;
