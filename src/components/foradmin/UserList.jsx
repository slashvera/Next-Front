"use client";
import React, { useState } from "react";
import { getUsers } from "@/api/users";
import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function UserList({ onAdd, onEdit }) {
    const router = useRouter();
    const [users, setUsers] = useState([]);

    const loadUsers = async () => {
        try {
            const response = await getUsers();
            setUsers(response.data);
        } catch (error) {
            console.error("ERROR AXIOS:", error);
        }
    };

    useEffect(() =>{
        loadUsers();
    }, []);

     return (
    <div className="mt-8 container mx-auto px-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">
          Lista de Usuarios
        </h1>

        <button
            onClick={onAdd}
            className="bg-blue-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg shadow transition duration-300"
          >
            New User +
          </button>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-500 uppercase text-xs border-b">
            <tr>
              <th className="px-6 py-4 text-left">No</th>
              <th className="px-6 py-4 text-left">Username</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {users.map((user, index) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4">{index + 1}</td>

                <td className="px-6 py-4 font-medium">
                  {user.username}
                </td>

                <td className="px-6 py-4 text-gray-500">
                  {user.email}
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  {user.is_active ? (
                    <span className="px-4 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                      Activo
                    </span>
                  ) : (
                    <span className="px-4 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700">
                      Inactivo
                    </span>
                  )}
                </td>

                {/* Actions */}
                <td className="px-4 py-4 text-center">
                  <div className="flex justify-center gap-2">
                    {/* Editar */}
                    <button
                      onClick={() => onEdit(user.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg shadow-sm transition"
                      title="Editar estudiante"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>

                    {/* Eliminar */}
                    <button
                      onClick={() => router.push(`/students/delete/${student.id_std}`)}
                      className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg shadow-sm transition"
                      title="Eliminar estudiante"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );

}