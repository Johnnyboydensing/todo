/** @format */

/** @format */

import React, { useEffect, useState } from "react";
import LoginForm from "./LoginForm";

function Login() {
  const [loginCredentials, SetLoginCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, SetError] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className='min-h-screen min-w-[250px] flex justify-center items-center'>
      <div className='relative  w-full sm:w-96 sm:h-96 sm:border border-slate-300 p-5 gap-10 rounded-md flex flex-col items-center justify-center'>
        <h1 className=' font-bold text-2xl text-slate-700'>Login</h1>

        <LoginForm
          loginCredentials={loginCredentials}
          SetLoginCredentials={SetLoginCredentials}
          SetError={SetError}
          error={error}
          loading={loading}
          setLoading={setLoading}
        />

        {error && (
          <h1
            className={`${
              loading ? "hidden" : "block"
            } text-sm text-red-400 font-semibold absolute bottom-7`}>
            {error}
          </h1>
        )}
      </div>
    </div>
  );
}

export default Login;
