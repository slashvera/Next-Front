"use client";

import React, { useState } from "react";
import { getTutors } from "@/api/tutors"; 
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function TutorList(){

    const router = useRouter();
    const [tutors, setTutors] = useState([]);

    const loadTutors = async () => {
        const res = await getTutors();
        setTutors(res.data)
    };

    useEffect(() => {
        loadTutors();
    },[]);

    return(

        <div className="mt-8 container mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-semibold text-base-content">
                    Lista de Estudiantes
                </h1>

                {/* Link en Next.js */}
                <Link
                  href="/students/new"
                  className="bg-primary hover:bg-primary-focus text-primary-content font-bold py-2 px-6 rounded shadow transition duration-300"
                >
                    New Tutor +
                </Link>
            </div>

            <div className="overflow-x-auto bg-base-100 shadow-md rounded-lg">
                <table className="min-w-full table-auto border-collapse">
                    <thead className="bg-base-200 border-b border-base-300">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-bold uppercase">No</th>
                            <th className="px-4 py-3 text-left text-sm font-bold uppercase">Code</th>
                            <th className="px-4 py-3 text-left text-sm font-bold uppercase">FullName</th>
                            <th className="px-4 py-3 text-left text-sm font-bold uppercase">Email</th>
                            <th className="px-4 py-3 text-left text-sm font-bold uppercase">Gender</th>
                            <th className="px-4 py-3 text-left text-sm font-bold uppercase">Status</th>
                            <th className="px-4 py-3 text-left text-sm font-bold uppercase">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-base-300">
                        {tutors.map((tutor, index) => (
                            <tr key={tutor.id_tutor} className="hover:bg-base-200 transition-colors">
                                <td className="px-4 py-4">{index + 1}</td>

                                <td className="px-4 py-4 font-medium">
                                    TH-{tutor.id_tutor}
                                </td>

                                <td className="px-4 py-4">
                                    {tutor.first_name} {tutor.last_name}
                                </td>

                                <td className="px-4 py-4 text-sm text-base-content">
                                    {tutor.correo_tutor}
                                </td>

                                <td className="px-4 py-4 text-sm text-base-content">
                                    {tutor.gender_display}
                                </td>
                                {/* Estado */}
                                <td className="px-4 py-4 text-sm">
                                    {tutor.is_active ? (
                                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-success text-success-content border border-success">
                                            Activo
                                        </span>
                                    ) : (
                                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-success text-success-content border border-success">
                                            Inactivo
                                        </span>    
                                    )}
                                </td>

                                {/* Acciones */}
                                <td className="px-4 py-4 text-center">
                                    <div className="flex justify-center gap-2">
                                        <button
                                          onClick={() =>
                                            router.push(`/tutors/edit/${tutor.id_tutor}`)}
                                          className=" bg-primary hover:bg-primary-focus text-primary-content p-2 rounded shadow-sm transition"
                                        >
                                            {/* Icono Editar */}
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>

                                        <button
                                          onClick={() => router.push(`/tutors/delete/${tutor.id_tutor}`)}
                                          className="bg-error hover:bg-red-700 text-error-content p-2 rounded shadow-sm transition"
                                        >
                                          {/* Icono Borrar */}
                                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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