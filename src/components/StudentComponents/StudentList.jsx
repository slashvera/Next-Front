"use client";
import React, { useState } from "react";
import { getStudents } from "@/api/students";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function StudentList() {
  const router = useRouter();
  const [students, setStudents] = useState([]);

  const loadStudents = async () => {
    const response = await getStudents();
    setStudents(response.data);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <div className=" mt-8 container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-base-content">
          Lista de Estudiantes
        </h1>

        {/* Link en Nextjs */}
        <Link
          href="/students/new"
          className="bg-primary hover:bg-primary-focus text-primary-content font-bold py-2 px-6 rounded shadow transition duration-300"
        >
          New Student +
        </Link>
      </div>

      <div className="overflow-x-auto bg-base-100 shadow-md rounded-lg">
            <table className="min-w-full table-auto border-collapse">
            <thead className="bg-base-200 border-b border-base-300">
                <tr>
                <th className="px-4 py-3 text-left text-sm font-bold uppercase">
                    No
                </th>
                <th className="px-4 py-3 text-left text-sm font-bold uppercase">
                    Code
                </th>
                <th className="px-4 py-3 text-left text-sm font-bold uppercase">
                    Full Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-bold uppercase">
                    Email
                </th>
                <th className="px-4 py-3 text-left text-sm font-bold uppercase">
                    City / Gender
                </th>
                <th className="px-4 py-3 text-left text-sm font-bold uppercase">
                    Status
                </th>
                <th className="px-4 py-3 text-center text-sm font-bold uppercase">
                    Actions
                </th>
                </tr>
            </thead>

            <tbody className="divide-y divide-base-300">
                {students.map((student, index) => (
                <tr
                    key={student.id_std}
                    className="hover:bg-base-200 transition-colors"
                >
                    <td className="px-4 py-4">{index + 1}</td>

                    <td className="px-4 py-4 font-medium">ST-{student.id_std}</td>

                    <td className="px-4 py-4">
                    {student.first_name} {student.last_name}
                    </td>

                    <td className="px-4 py-4">{student.correo_std || "—"}</td>

                    <td className="px-4 py-4">
                    {student.city_std} |{" "}
                    <span className="italic opacity-70">
                        {student.gender_display}
                    </span>
                    </td>

                    {/* Estado */}
                    <td className="px-4 py-4">
                    {student.is_active ? (
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-success text-success-content">
                        Activo
                        </span>
                    ) : (
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-error text-error-content">
                        Inactivo
                        </span>
                    )}
                    </td>

                    {/* Acciones */}
                    <td className="px-4 py-4 text-center">
                    <div className="flex justify-center gap-2">
                        <button
                        onClick={() =>
                            router.push(`/students/edit/${student.id_std}`)
                        }
                        className="bg-primary p-2 rounded shadow-sm hover:bg-primary-focus"
                        >
                        ✏️
                        </button>

                        <button
                        onClick={() =>
                            router.push(`/students/delete/${student.id_std}`)
                        }
                        className="bg-error p-2 rounded shadow-sm hover:bg-red-700"
                        >
                        🗑️
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
