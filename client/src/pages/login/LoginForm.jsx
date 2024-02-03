/** @format */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import LoaderBtn from "./LoaderBtn";

const LoginFunc = async (input) => {
  try {
    const res = await axios.post(
      `https://todo-app-y3h8.onrender.com/Auth/login`,
      input,
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

function LoginForm({
  loginCredentials,
  SetLoginCredentials,
  SetError,
  error,
  loading,
  setLoading,
}) {
  const nav = useNavigate();
  const queryClient = useQueryClient();

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    SetLoginCredentials({
      ...loginCredentials,
      [name]: value,
    });
  };

  const { mutate } = useMutation({
    mutationKey: ["logged-user"],
    mutationFn: LoginFunc,
    onSuccess: async (result) => {
      if (result.data.isAuth === true) {
        await queryClient.invalidateQueries({ queryKey: ["logged-user"] });
        nav("/");
        setLoading(false);
      } else {
        SetError(result.data.msg);
        setLoading(false);
      }
    },
  });

  const handleSubmit = async (input) => {
    mutate(input);
    setLoading(true);
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className='flex flex-col gap-6  w-full items-center'>
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
        className='border border-slate-300 mb-2 rounded-md w-[80%] p-2'
      />

      {loading ? (
        <LoaderBtn />
      ) : (
        <button
          type='submit'
          disabled={!loginCredentials.username || !loginCredentials.password}
          onClick={() => handleSubmit(loginCredentials)}
          className='bg-sky-400 h-9 disabled:bg-sky-300 text-white font-semibold p-1 text-sm w-1/2 rounded-full'>
          Login
        </button>
      )}
    </form>
  );
}

export default LoginForm;
