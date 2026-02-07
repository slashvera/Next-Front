"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PiUserLight, PiStudentLight } from "react-icons/pi";
import { MdOutlineClass } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import  logo from "@/assets/logo-side.svg";


export default function AdminDashboard() {
    const router = useRouter();
    const [cursos, setCursos] = useState([]);
    const [alumnos, setAlumnos] = useState([]);
    const [profesores, setProfesores] = useState([]);

    return(

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4 gap-4">
        {/* Usuarios */}
        <div className="card w-full max-w-xs bg-blue-600 text-white shadow-xl hover:scale-105 transition-transform duration-300">
            <div className="card-body">
                <div className="flex items-center gap-3">
                    <span className="p-2 rounded-full bg-blue-800">
                    <PiUserLight size={22} />
                    </span>
                    <h2 className="card-title">Usuarios</h2>
                </div>
                <p className="text-4xl font-bold mt-2">12</p>
                <p className="text-sm opacity-80">Registrados este mes</p>
            </div>
        </div>

        {/* Cursos */}
        <div className="card w-full max-w-xs bg-blue-600 text-white shadow-xl hover:scale-105 transition-transform duration-300">
            <div className="card-body">
                <div className="flex items-center gap-3">
                    <span className="p-2 rounded-full bg-blue-800">
                    <MdOutlineClass size={22} />
                    </span>
                    <h2 className="card-title">Cursos</h2>
                </div>
                <p className="text-4xl font-bold mt-2">4</p>
             <p className="text-sm opacity-80">Activos actualmente</p>
            </div>
        </div>

        {/* Reportes */}
        <div className="card w-full max-w-xs bg-blue-600 text-white shadow-xl hover:scale-105 transition-transform duration-300">
            <div className="card-body">
                <div className="flex items-center gap-3">
                    <span className="p-2 rounded-full bg-blue-800">
                    <TbReportSearch size={22} />
                    </span>
                    <h2 className="card-title">Reportes</h2>
                </div>
                <p className="text-4xl font-bold mt-2">12</p>
                <p className="text-sm opacity-80">Generados esta semana</p>
            </div>
        </div>

        <div className="card w-full max-w-xs bg-blue-600 text-white shadow-xl hover:scale-105 transition-transform duration-300">
            <div className="card-body">
                <div className="flex items-center gap-3">
                    <span className="p-2 rounded-full bg-blue-800">
                    <PiStudentLight size={22} />
                    </span>
                    <h2 className="card-title">Estudiantes</h2>
                </div>
                <p className="text-4xl font-bold mt-2">24</p>
                <p className="text-sm opacity-80">Inscritos actualmente</p>
            </div>
        </div>
    </div>
    );
}