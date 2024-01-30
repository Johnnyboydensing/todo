/** @format */

import React, { useEffect, useRef, useState } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditTodo } from "./Crud";

function EditModal({ list, setModal }) {
  const queryClient = useQueryClient();
  const [editTask, setEditTask] = useState("");
  const ref = useRef();
  const { mutate: Edit } = useMutation({
    mutationKey: ["todo-list"],
    mutationFn: EditTodo,
    onSuccess: async (res) => {
      await queryClient.invalidateQueries({ queryKey: ["todo-list"] });
      setModal((prev) => {
        return { ...prev, editModal: null };
      });
    },
  });

  useEffect(() => {
    ref.current.focus();
  }, [ref]);

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className='w-full flex items-center gap-2'>
      <input
        ref={ref}
        type='text'
        value={editTask}
        placeholder='New task....'
        className='w-full focus:outline-none p-1 pl-2 text-sm rounded-md'
        onChange={(e) => setEditTask(e.target.value)}
      />
      <span className='flex'>
        <button
          type='submit'
          disabled={!editTask}
          onClick={() => Edit({ todo_task: editTask, todo_id: list.todo_id })}
          className='text-2xl  text-sky-500 hover:text-sky-700 disabled:text-sky-400'>
          <IoMdCheckmark />
        </button>
        <IoMdClose
          onClick={() =>
            setModal((prev) => {
              return { ...prev, editModal: null };
            })
          }
          className=' text-2xl text-red-500 hover:text-red-700 cursor-pointer'
        />
      </span>
    </form>
  );
}

export default EditModal;
