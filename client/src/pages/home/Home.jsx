/** @format */

import React from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Logout } from "./Crud";

function Home({ loggedUser }) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["logout"],
    mutationFn: Logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["logged-user"] });
    },
  });

  return (
    <div className='sm:bg-sky-400 min-h-screen min-w-[280px] flex justify-center items-center'>
      <div className='bg-white w-full rounded-md min-h-96 sm:w-96 p-4 sm:shadow-2xl flex flex-col gap-3'>
        <button
          onClick={mutate}
          className='absolute right-14 bottom-10 font-semibold text-sm bg-black text-white p-2 w-20 rounded-2xl'>
          logout
        </button>
        <TodoForm userId={loggedUser?.data.user.user_id} />

        <TodoList userId={loggedUser?.data.user.user_id} />
      </div>
    </div>
  );
}

export default Home;
