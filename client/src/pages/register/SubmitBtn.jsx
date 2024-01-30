/** @format */

import React from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Submit = async (input) => {
  try {
    const res = await axios.post(`http://localhost:3000/Auth/register`, input, {
      withCredentials: true,
    });
    return res;
  } catch (error) {
    return error;
  }
};

function SubmitBtn({ userCredentials, SetUserCredentials, error, SetError }) {
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
  return (
    <div
      className='w-full flex justify-center'
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          handleSubmit(userCredentials);
        }
      }}
      >
      <button
        disabled={!userCredentials.username || !userCredentials.password}
        onClick={() => handleSubmit(userCredentials)}
        className='bg-sky-400 h-9 disabled:bg-sky-300 text-white font-semibold p-1 text-sm w-[40%] rounded-full'>
        Submit
      </button>
    </div>
  );
}

export default SubmitBtn;
