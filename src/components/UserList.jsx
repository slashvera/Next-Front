"use client";

import { useState, useEffect } from "react";
import { getUsers } from "@/api/users"; 
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UserList() {
  const router = useRouter();
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const response = await getUsers();
    setUsers(response.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="mt-8 container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-base-content">
          Lista de Usuarios
        </h1>
        <Link
          href="/new-user"
          className="bg-primary hover:bg-primary-focus text-primary-content font-bold py-2 px-6 rounded shadow transition duration-300"
        >
          New User +
        </Link>
      </div>

      <div className="overflow-x-auto bg-base-100 shadow-md rounded-lg">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-base-200 border-b border-base-300">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-bold text-base-content uppercase">
                No
              </th>
              <th className="px-4 py-3 text-left text-sm font-bold text-base-content uppercase">
                UserName
              </th>
              <th className="px-4 py-3 text-left text-sm font-bold text-base-content uppercase">
                Email
              </th>
              <th className="px-4 py-3 text-left text-sm font-bold text-base-content uppercase">
                Status
              </th>
              <th className="px-4 py-3 text-center text-sm font-bold text-base-content uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-base-300">
            {users.map((user, index) => (
              <tr key={user.id} className="hover:bg-base-200 transition-colors">
                <td className="px-4 py-4 text-sm text-base-content">
                  {index + 1}
                </td>
                <td className="px-4 py-4 text-sm text-base-content">
                  {user.username}
                </td>
                <td className="px-4 py-4 text-sm text-base-content">
                  {user.email}
                </td>

                {/* Estado */}
                <td className="px-4 py-4 text-sm">
                  {user.is_active ? (
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-success text-success-content border border-success">
                      Activo
                    </span>
                  ) : (
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-error text-error-content border border-error">
                      Inactivo
                    </span>
                  )}
                </td>

                {/* Acciones */}
                <td className="px-4 py-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => router.push(`/edit-user/${user.id}`)}
                      className="bg-primary hover:bg-primary-focus text-primary-content p-2 rounded shadow-sm transition"
                    >
                      {/* Icono editar */}
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
                    <button
                      onClick={() => router.push(`/delete-user/${user.id}`)}
                      className="bg-error hover:bg-red-700 text-error-content p-2 rounded shadow-sm transition"
                    >
                      {/* Icono borrar */}
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