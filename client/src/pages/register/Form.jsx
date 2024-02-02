/** @format */

import React, { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Submit = async (input) => {
  try {
    const res = await axios.post(
      `https://todo-app-y3h8.onrender.com/Auth/register`,
      input,
      {
        withCredentials: true,
      }
    );
    return res;
  } catch (error) {
    return error;
  }
};

function Form({ userCredentials, SetUserCredentials, error, SetError }) {
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    SetUserCredentials({
      ...userCredentials,
      [name]: value,
    });
  };

  const nav = useNavigate();
  const { mutate } = useMutation({
    mutationKey: ["user-registration"],
    mutationFn: Submit,
    onSuccess: (result) => {
      if (result.response) {
        SetError(result.response.data.msg);
      } else {
        nav("/login");
      }
    },
  });

  const handleSubmit = (input) => {
    mutate(input);
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        SetError(null);
      }, 2000);
    }
  }, [error]);

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className='flex flex-col gap-5  w-full items-center'>
      <input
        onChange={handleOnchange}
        name='username'
        type='text'
        placeholder='Username..'
        className='border border-slate-300 w-[80%] rounded-md p-2'
      />
      <input
        onChange={handleOnchange}
        name='password'
        type='password'
        placeholder='password..'
        className='border border-slate-300 rounded-md w-[80%] p-2'
      />
      <button
        disabled={!userCredentials.username || !userCredentials.password}
        onClick={() => handleSubmit(userCredentials)}
        className='bg-sky-400 h-9 disabled:bg-sky-300 text-white font-semibold p-1 text-sm w-[40%] rounded-full'>
        Submit
      </button>
    </form>
  );
}

export default Form;
