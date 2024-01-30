/** @format */

import React, { useState } from "react";
import { AddTodo } from "./Crud";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaPlus } from "react-icons/fa6";
function TodoForm({ userId }) {
  const [todo, setTodo] = useState("");
  const queryClient = useQueryClient();
  const { mutate: Add } = useMutation({
    mutationKey: ["todo-list"],
    mutationFn: AddTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo-list"] });
      setTodo("");
    },
  });

  return (
    <div className='flex flex-col gap-3 border-b-4 pb-2 border-sky-500'>
      <h1 className='text-2xl pl-.5 font-bold text-stone-800'>
        Todo Application
      </h1>
      <form
        action=''
        className='w-full flex gap-1'
        onSubmit={(e) => e.preventDefault()}>
        <input
          type='text'
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder='Enter task..'
          className='w-full outline-none focus:border-zinc-600 p-1 pl-2.5 border border-gray-400 placeholder:text-gray-40 rounded-md placeholder:text-sm'
        />
        <button
          disabled={!todo}
          onClick={() => Add({ todo_task: todo, user_id: userId })}
          className='w-1/2 disabled:bg-sky-400 hover:bg-sky-600 bg-sky-500 text-white text-sm font-semibold  rounded-md flex items-center justify-center'>
          <span className='flex items-center gap-2'>
            <FaPlus className='' />
            Add Todo
          </span>
        </button>
      </form>
    </div>
  );
}

export default TodoForm;
