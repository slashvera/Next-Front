"use client";
import { redirect } from "next/navigation";
import { BsGraphDownArrow } from "react-icons/bs"; //Icono Reprobados
import { BsGraphUpArrow } from "react-icons/bs"; //Icono aprobado
import { MdOutlineAutoGraph } from "react-icons/md"; //Icono promedio G
import { MdShowChart } from "react-icons/md"; // Nota mayor/menor

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4 gap-3">
      {/*Clases aprobadas*/}
      <div className="flex items-center gap-4 bg-white rounded-2xl shadow-sm p-6 min-h-27.5 hover:scale-105 transition-transform duration-300 ease-in-out hover:shadow-lg">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-green-500 text-white">
                {/* aquí va el icono */}
                <BsGraphUpArrow/>
            </div>
            {/* Texto */}
            <div>
                <h2 className="text-2xl font-semibold text-gray-800">29</h2>
                <p className="text-sm text-gray-500">Cursos Aprobadas</p>
            </div>
      </div>

      {/*Clses Reporbadas */}
      <div className="flex items-center gap-4 bg-white rounded-2xl shadow-sm p-6 min-h-27.5 hover:scale-105 transition-transform duration-300 ease-in-out hover:shadow-lg">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-500 text-white">
                {/* aquí va el icono */}
                <BsGraphDownArrow/>
            </div>
            {/* Texto */}
            <div>
                <h2 className="text-2xl font-semibold text-gray-800">2</h2>
                <p className="text-sm text-gray-500">Cursos Reprobados</p>
            </div>
      </div>
      {/*Promedio General */}
      <div className="flex items-center gap-4 bg-white rounded-2xl shadow-sm p-6 min-h-27.5 hover:scale-105 transition-transform duration-300 ease-in-out hover:shadow-lg">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-500 text-white">
                {/* aquí va el icono */}
                <MdOutlineAutoGraph/>
            </div>
            {/* Texto */}
            <div>
                <h2 className="text-2xl font-semibold text-gray-800">85 %</h2>
                <p className="text-sm text-gray-500">Promedio General</p>
            </div>
      </div>
      {/*Nota mayor */}
      <div className="flex items-center gap-4 bg-white rounded-2xl shadow-sm p-6 min-h-27.5 hover:scale-105 transition-transform duration-300 ease-in-out hover:shadow-lg">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-green-500 text-white">
                {/* aquí va el icono */}
                <MdShowChart/>
            </div>
            {/* Texto */}
            <div>
                <h2 className="text-2xl font-semibold text-gray-800">88</h2>
                <p className="text-sm text-gray-500">Nota Mayor</p>
            </div>
      </div>
      {/*Nota menor */}
      <div className="flex items-center gap-4 bg-white rounded-2xl shadow-sm p-6 min-h-27.5 hover:scale-105 transition-transform duration-300 ease-in-out hover:shadow-lg">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-yellow-500 text-white">
                {/* aquí va el icono */}
                <MdShowChart/>
            </div>
            {/* Texto */}
            <div>
                <h2 className="text-2xl font-semibold text-gray-800">29</h2>
                <p className="text-sm text-gray-500">Nota menor</p>
            </div>
      </div>

    </div>
  );
}
