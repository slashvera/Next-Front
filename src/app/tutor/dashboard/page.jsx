"use client";
import { redirect } from "next/navigation";

export default function TeacherDashboard() {
  return (
    <div className="p-6 space-y-6">

      {/* Título */}
      <h1 className="text-2xl font-bold">Dashboard del Maestro</h1>

      {/* Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card */}
      </section>

      {/* Mis clases */}
      <section className="bg-base-100 p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Mis Clases</h2>
        {/* Tabla */}
      </section>

      {/* Evaluaciones */}
      <section className="bg-base-100 p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Evaluaciones Pendientes</h2>
      </section>

    </div>
  );
}
