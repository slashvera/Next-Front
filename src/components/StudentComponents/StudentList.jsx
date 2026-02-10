"use client";
import React, { useState } from "react";
import { getStudents } from "@/api/students";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function StudentList({ onAdd }) {
  const router = useRouter();
  const [students, setStudents] = useState([]);

  const loadStudents = async () => {
  try {
    const response = await getStudents();
    setStudents(response.data);
  } catch (error) {
    console.error("ERROR AXIOS:", error);
  }
};

  useEffect(() => {
    loadStudents();
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
        New Student +
      </button>
    </div>

    {/* Tabla */}
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full border-collapse">
        <thead className="bg-gray-100 text-gray-500 uppercase text-xs border-b">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">
              No
            </th>
            <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">
              Code
            </th>
            <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">
              Full Name
            </th>
            <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">
              Email
            </th>
            <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">
              City / Gender
            </th>
            <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">
              Status
            </th>
            <th className="px-4 py-3 text-center text-xs font-bold text-gray-600 uppercase">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {students.map((student, index) => (
            <tr
              key={student.id_std}
              className="hover:bg-gray-50 transition-colors"
            >
              <td className="px-4 py-3 text-sm text-gray-700">
                {index + 1}
              </td>

              <td className="px-4 py-3 text-sm font-medium text-blue-600">
                ST-{student.id_std}
              </td>

              <td className="px-4 py-3 text-sm text-gray-700">
                {student.first_name} {student.last_name}
              </td>

              <td className="px-4 py-3 text-sm text-gray-500">
                {student.correo_std || "—"}
              </td>

              <td className="px-4 py-3 text-sm text-gray-700">
                {student.city_std}{" "}
                <span className="italic text-gray-400">
                  ({student.gender_display})
                </span>
              </td>

              {/* Estado */}
              <td className="px-4 py-3">
                {student.is_active ? (
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                    Activo
                  </span>
                ) : (
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700">
                    Inactivo
                  </span>
                )}
              </td>

              {/* Acciones */}
              <td className="px-4 py-4 text-center">
                <div className="flex justify-center gap-2">
                  {/* Editar */}
                  <button
                    onClick={() => router.push(`/students/edit/${student.id_std}`)}
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
