"use client";
import React, { useEffect, useState } from "react";
import { getMatriculas } from "@/api/matriculas";
import { useNotify } from "@/hooks/useNotify";

export default function CursosPage() {
  const [matriculas, setMatriculas] = useState([]);
  const notify = useNotify();

  useEffect(() => {
    const loadMatriculas = async () => {
      try {
        const res = await getMatriculas();
        setMatriculas(res.data);
      } catch (error) {
        console.error("Error cargando cursos inscritos", error);
        notify.error("No se pudieron cargar los cursos inscritos");
      }
    };
    loadMatriculas();
  }, []);

  return (
    <div className="flex min-h-screen">

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold mb-6">Mis Cursos Inscritos</h1>

        {matriculas.length === 0 ? (
          <p className="text-gray-600">No tienes cursos inscritos aún.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matriculas.map((m) => (
              <div
                key={m.id_matricula}
                className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold text-green-700 mb-2">
                  {m.nombre_curso}
                </h2>
                <p className="text-gray-600 mb-1">
                  Profesor: {m.profesor_nombre || "Sin asignar"}
                </p>
                <p className="text-gray-600 mb-1">Semestre: {m.semestre}</p>
                <p
                  className={`text-sm font-bold ${
                    m.estado === "Activo" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {m.estado}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}