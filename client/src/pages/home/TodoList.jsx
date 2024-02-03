/** @format */

import React, { useState } from "react";
import { GetTodo } from "./Crud";
import { useQuery } from "@tanstack/react-query";
import { RiDeleteBinLine } from "react-icons/ri";
import { GrEdit } from "react-icons/gr";
import DeletModal from "./DeletModal";
import EditModal from "./EditModal";
import DeleteMultiple from "./DeleteMultiple";
import Spinner from "../../components/Spinner";
function TodoList({ userId }) {
  const [modals, setModals] = useState({
    deleteModal: null,
    deleteMultiple: null,
    editModal: null,
  });
  const [multipleId, setMultipleId] = useState([]);

  const { data: todoList, isLoading } = useQuery({
    queryKey: ["todo-list", userId],
    queryFn: () => GetTodo(userId),
  });

  return (
    <ul className='flex flex-col gap-1'>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {todoList?.data.todos.map((list) => (
            <div
              key={list.todo_id}
              className='list-none flex justify-between bg-zinc-200 rounded-md p-2'>
              {modals.editModal === list.todo_id ? (
                <EditModal list={list} setModal={setModals} modals={modals} />
              ) : (
                <>
                  <span className='flex gap-3 items-center w-full overflow-hidden'>
                    <p
                      onClick={() => {
                        setMultipleId((prev) => {
                          if (prev.includes(list.todo_id)) {
                            return multipleId.filter((e) => e != list.todo_id);
                          }
                          return [...prev, list.todo_id];
                        });
                      }}
                      className={`${
                        multipleId.includes(list.todo_id)
                          ? "line-through text-stone-500"
                          : "list-none"
                      } text-sm text-stone-700 font-mono w-full break-words cursor-pointer`}>
                      {list.todo_task}
                    </p>
                  </span>

                  <span className='flex gap-2 items-center justify-center'>
                    <GrEdit
                      onClick={() =>
                        setModals((prev) => {
                          return { ...prev, editModal: list.todo_id };
                        })
                      }
                      className='text-xl text-stone-600 cursor-pointer hover:text-yellow-400'
                    />
                    <RiDeleteBinLine
                      onClick={() =>
                        setModals((prev) => {
                          return { ...prev, deleteModal: list.todo_id };
                        })
                      }
                      className='text-xl text-stone-600 cursor-pointer hover:text-red-400'
                    />

                    <DeletModal
                      id={modals.deleteModal}
                      setModals={setModals}
                      modals={modals}
                    />
                    <DeleteMultiple
                      id={modals.deleteModal}
                      setModals={setModals}
                      modals={modals}
                      multipleId={multipleId}
                    />
                  </span>
                </>
              )}
            </div>
          ))}
        </>
      )}

      <button
        disabled={multipleId.length === 0}
        onClick={() =>
          setModals((prev) => {
            return { ...prev, deleteMultiple: true };
          })
        }
        className='bg-red-300 text-white text-sm font-semibold p-1 w-28 rounded-lg mt-3 disabled:bg-stone-400'>
        Trash items
      </button>
    </ul>
  );
}

export default TodoList;
