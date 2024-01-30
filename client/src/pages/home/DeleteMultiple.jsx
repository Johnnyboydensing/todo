/** @format */

import React, { useEffect, useRef } from "react";
import { DeleteMultipleTodo } from "./Crud";
import { useMutation, useQueryClient } from "@tanstack/react-query";
function DeleteMultiple({ multipleId, setModals, modals }) {
  const reff = useRef(null);
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["todo-list"],
    mutationFn: DeleteMultipleTodo,
    onSuccess: async (res) => {
      await queryClient.invalidateQueries({ queryKey: ["todo-list"] });
      setModals((prev) => {
        return { ...prev, deleteMultiple: null };
      });
    },
  });

  const handleClickOutside = async (e) => {
    const oo = e.target.id != "modalshadow" && true;

    if (!oo) {
      setModals((prev) => {
        return { ...prev, deleteMultiple: null };
      });
    }
  };

  useEffect(() => {
    if (modals.deleteMultiple) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [modals.deleteMultiple]);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      id='modalshadow'
      className={`${
        modals.deleteMultiple ? "flex" : "hidden"
      } absolute w-full left-0 top-0 bg-black bg-opacity-20 h-full flex justify-center items-center`}>
      <div
        onClick={(e) => e.stopPropagation()}
        id='modalcontainer'
        ref={reff}
        className='w-full  max-w-[350px] shadow-2xl bg-white  rounded-md'>
        <h1 className='text-xl font-serif text-stone-800 text-center p-10 '>
          Are you sure you want to delete this list?
        </h1>

        <div className='flex justify-center p-5'>
          <div className='flex gap-3'>
            <button
              onClick={() =>
                setModals((prev) => {
                  return { ...prev, deleteMultiple: null };
                })
              }
              className='bg-stone-400 hover:bg-stone-500 text-sm text-white font-semibold h-8 w-20 rounded-md'>
              Cancel
            </button>
            <button
              onClick={() => mutate(multipleId)}
              className='bg-red-600 hover:bg-red-700 text-sm text-white font-semibold h-8 w-20 rounded-md'>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteMultiple;
