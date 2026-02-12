"use client";
import { useState, useEffect } from "react";
import { getCursos } from "@/api/cursos";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CursoList({ onAdd, onEdit }) {
  const router = useRouter();
  const [cursos, setCursos] = useState([]);

  const loadCursos = async () => {
    try {
      const response = await getCursos();
      setCursos(response.data);
    } catch (error) {
      console.error("ERROR AXIOS:", error);
    }
  };

  useEffect(() => {
    loadCursos();
  }, []);

  return (
    <div className="mt-8 container mx-auto px-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">
          Lista de Cursos Disponibles
        </h1>

        <button
          onClick={onAdd}
          className="bg-blue-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg shadow transition duration-300"
        >
          New Course +
        </button>
      </div>

      {/* Grid de tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cursos.map((curso) => (
          <div
            key={curso.id_curso}
            className="bg-white rounded-lg shadow p-4 hover:scale-105 transition-transform duration-300 ease-in-out hover:shadow-lg"
          >
            <p className="text-sm text-gray-700 mb-1">
              <span className="font-bold">ID:</span> {curso.id_curso}
            </p>
            <p className="text-sm text-gray-700 mb-1">
              <span className="font-bold">Código:</span> {curso.codigo_curso}
            </p>
            <p className="text-sm text-gray-700 mb-1">
              <span className="font-bold">Nombre:</span> {curso.nombre_curso}
            </p>
            <p className="text-sm text-gray-700 mb-1">
              <span className="font-bold">Año:</span> {curso.year_curso}
            </p>
            <p className="text-sm text-gray-700 mb-3">
              <span className="font-bold">Semestre:</span> {curso.semestre_curso}
            </p>

            {/* Botones de acción */}
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(curso.id_curso)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm transition"
              >
                Editar
              </button>
              <button
                onClick={() => router.push(`/courses/delete/${curso.id_curso}`)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm transition"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}