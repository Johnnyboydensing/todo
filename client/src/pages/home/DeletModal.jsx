/** @format */

import React, { useEffect, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteTodo } from "./Crud";
function DeletModal({ id, setModals, modals }) {
  const reff = useRef();
  const queryClient = useQueryClient();
  const { mutate: Delete } = useMutation({
    mutationKey: ["todo-list"],
    mutationFn: DeleteTodo,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["todo-list"] });
      setModals((prev) => {
        return { ...prev, deleteModal: null };
      });
    },
  });

  const handleClickOutside = async (e) => {
    const oo = e.target.id != "modalshadow" && true;

    if (!oo) {
      setModals((prev) => {
        return { ...prev, deleteModal: null };
      });
    }
  };

  useEffect(() => {
    if (modals.deleteModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [modals.deleteModal]);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      id='modalshadow'
      className={`${
        modals.deleteModal ? "flex" : "hidden"
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
                  return { ...prev, deleteModal: null };
                })
              }
              className='bg-stone-400 hover:bg-stone-500 text-sm text-white font-semibold h-8 w-20 rounded-md'>
              Cancel
            </button>
            <button
              onClick={() => Delete(id)}
              className='bg-red-600 hover:bg-red-700 text-sm text-white font-semibold h-8 w-20 rounded-md'>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeletModal;
