/** @format */

import React, { useEffect, useState } from "react";
import Form from "./Form";

function Register() {
  const [userCredentials, SetUserCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, SetError] = useState(null);

  return (
    <div className='min-h-screen min-w-[250px]  flex justify-center items-center'>
      <div className='relative w-full sm:w-96 sm:h-96 sm:border border-slate-300 p-5 gap-10 rounded-md flex flex-col items-center justify-center'>
        <h1 className='font-bold text-2xl text-slate-700'>Register</h1>

        <Form
          userCredentials={userCredentials}
          SetUserCredentials={SetUserCredentials}
          error={error}
          SetError={SetError}
        />

        {error && (
          <h1
            className='text-sm text-red-400 font-semibold absolute bottom-7
        '>
            {error}
          </h1>
        )}
      </div>
    </div>
  );
}

export default Register;
