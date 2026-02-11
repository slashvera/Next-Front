"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PiUserLight, PiStudentLight } from "react-icons/pi";
import { MdOutlineClass } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import logo from "@/assets/logo-side.svg";

export default function AdminDashboard() {
  const router = useRouter();
  const [cursos, setCursos] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  const [profesores, setProfesores] = useState([]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4 gap-4">
      {/* Usuarios */}
      <div className="w-full max-w-xs bg-blue-600 text-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition duration-300">
        <div className="flex items-center gap-3 mb-4">
          <span className="p-2 rounded-full bg-blue-800">
            <PiUserLight size={22} />
          </span>
          <h2 className="text-lg font-semibold">Usuarios</h2>
        </div>
        <p className="text-4xl font-bold">12</p>
        <p className="text-sm opacity-80">Registrados este mes</p>
      </div>

      {/* Cursos */}
      <div className="w-full max-w-xs bg-blue-600 text-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition duration-300">
        <div className="flex items-center gap-3 mb-4">
          <span className="p-2 rounded-full bg-blue-800">
            <MdOutlineClass size={22} />
          </span>
          <h2 className="text-lg font-semibold">Cursos</h2>
        </div>
        <p className="text-4xl font-bold">4</p>
        <p className="text-sm opacity-80">Activos actualmente</p>
      </div>

      {/* Reportes */}
      <div className="w-full max-w-xs bg-blue-600 text-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition duration-300">
        <div className="flex items-center gap-3 mb-4">
          <span className="p-2 rounded-full bg-blue-800">
            <TbReportSearch size={22} />
          </span>
          <h2 className="text-lg font-semibold">Reportes</h2>
        </div>
        <p className="text-4xl font-bold">12</p>
        <p className="text-sm opacity-80">Generados esta semana</p>
      </div>

      {/* Estudiantes */}
      <div className="w-full max-w-xs bg-blue-600 text-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition duration-300">
        <div className="flex items-center gap-3 mb-4">
          <span className="p-2 rounded-full bg-blue-800">
            <PiStudentLight size={22} />
          </span>
          <h2 className="text-lg font-semibold">Estudiantes</h2>
        </div>
        <p className="text-4xl font-bold">24</p>
        <p className="text-sm opacity-80">Inscritos actualmente</p>
      </div>
    </div>
  );
}