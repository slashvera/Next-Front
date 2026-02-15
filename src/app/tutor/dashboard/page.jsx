"use client";

import { useEffect, useState } from "react";
import { getCursos } from "@/api/cursos";
import { getStudents } from "@/api/students";


export default function TeacherDashboard() {

  const [cursos, setCursos] = useState(0);
  const [students, setStudents] = useState(0);
  const [evaluations, setEvaluations] = useState([]);

  useEffect(() => {

    // 🔹 Cursos
    getCursos()
      .then(res => {
        setCursos(res.data.length);
      })
      .catch(err => console.error("Error cargando cursos:", err));

    // 🔹 Estudiantes
    getStudents()
      .then(res => {
        setStudents(res.data.length);
      })
      .catch(err => console.error("Error cargando estudiantes:", err));

    // 🔹 Evaluaciones inventadas 
    setEvaluations([
      {
        id: 1,
        title: "Examen Unidad 1",
        course: "Matemática 10°",
        status: "pending",
      },
      {
        id: 2,
        title: "Tarea Cinemática",
        course: "Física 11°",
        status: "review",
      },
      {
        id: 3,
        title: "Laboratorio Química",
        course: "Química 9°",
        status: "completed",
      },
    ]);

  }, []);

  const changeStatus = (id) => {
    setEvaluations((prev) =>
      prev.map((evalItem) => {
        if (evalItem.id === id) {
          if (evalItem.status === "pending") {
            return { ...evalItem, status: "review" };
          }
          if (evalItem.status === "review") {
            return { ...evalItem, status: "completed" };
          }
          return { ...evalItem, status: "pending" };
        }
        return evalItem;
      })
    );
  };

  const renderStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <span className="flex items-center gap-2 px-4 py-1 text-xs font-semibold rounded-full bg-red-600/20 text-red-400 border border-red-500 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.7)]">
            🔴 Pendiente
          </span>
        );
      case "review":
        return (
          <span className="flex items-center gap-2 px-4 py-1 text-xs font-semibold rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.7)] hover:scale-110 transition">
            🟡 Por revisar
          </span>
        );
      case "completed":
        return (
          <span className="flex items-center gap-2 px-4 py-1 text-xs font-semibold rounded-full bg-green-600/20 text-green-400 border border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.7)]">
            🟢 Completado
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] p-8 text-white">

      {/* Encabezado */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold">Dashboard del Maestro</h1>
        <p className="text-gray-400 mt-1">
          Bienvenido 👋 Aquí tienes el resumen general de tu actividad.
        </p>
      </div>

      {/* Cards estadísticas */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-[#1e293b] p-6 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.7)]">
          <p className="text-sm text-gray-400">Clases Activas</p>
          <h2 className="text-3xl font-bold mt-2 text-blue-400">{cursos}</h2>
        </div>

        <div className="bg-[#1e293b] p-6 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.7)]">
          <p className="text-sm text-gray-400">Estudiantes</p>
          <h2 className="text-3xl font-bold mt-2 text-green-400">{students}</h2>
        </div>

        <div className="bg-[#1e293b] p-6 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.7)]">
          <p className="text-sm text-gray-400">Evaluaciones Pendientes</p>
          <h2 className="text-3xl font-bold mt-2 text-red-400">
            {evaluations.filter(e => e.status === "pending").length}
          </h2>
        </div>

        <div className="bg-[#1e293b] p-6 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.7)]">
          <p className="text-sm text-gray-400">Próxima Clase</p>
          <h2 className="text-lg font-semibold mt-2 text-yellow-400">
            Hoy 3:00 PM
          </h2>
        </div>
      </section>

      {/* Mis Clases */}
      <section className="bg-[#1e293b] p-8 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] mb-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold">Mis Clases</h2>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition">
            + Nueva Clase
          </button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {evaluations.slice(0,3).map((evalItem) => (
            <div key={evalItem.id} className="p-6 bg-[#0f172a] rounded-xl shadow-[0_5px_20px_rgba(0,0,0,0.8)] hover:scale-105 transition cursor-pointer">
              <h3 className="font-semibold text-white">
                {evalItem.course}
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                Evaluación activa
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Evaluaciones */}
      <section className="bg-[#1e293b] p-8 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
        <h2 className="text-xl font-semibold mb-8">
          Evaluaciones
        </h2>

        <div className="space-y-6">
          {evaluations.map((evalItem) => (
            <div
              key={evalItem.id}
              onClick={() => changeStatus(evalItem.id)}
              className="flex justify-between items-center p-5 rounded-xl bg-[#0f172a] shadow-[0_5px_20px_rgba(0,0,0,0.8)] hover:scale-[1.02] transition cursor-pointer"
            >
              <div>
                <p className="font-medium text-white">
                  {evalItem.title}
                </p>
                <p className="text-sm text-gray-400">
                  {evalItem.course}
                </p>
              </div>

              {renderStatusBadge(evalItem.status)}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
