"use client";

import { useState, useEffect } from "react";
import { getMatriculas, createMatricula } from "@/api/matriculas";

export default function EnrollmentPage() {
  const [matriculas, setMatriculas] = useState([]);
  const [formData, setFormData] = useState({
    id_std: "",
    id_curso: "",
    semestre: "",
    estado: "ACTIVA",
  });

  // Cargar matriculas
  const loadMatriculas = async () => {
    try {
      const response = await getMatriculas();
      setMatriculas(response.data);
    } catch (error) {
      console.error("Error cargando matriculas:", error);
    }
  };

  useEffect(() => {
    loadMatriculas();
  }, []);

  // Submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createMatricula(formData);
      setFormData({ id_std: "", id_curso: "", semestre: "", estado: "ACTIVA" });
      loadMatriculas();
    } catch (error) {
      console.error("Error creando matrícula:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Gestión de Matriculación
      </h1>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded p-4 mb-6 border border-gray-200"
      >
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="ID Estudiante"
            value={formData.id_std}
            onChange={(e) => setFormData({ ...formData, id_std: e.target.value })}
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="ID Curso"
            value={formData.id_curso}
            onChange={(e) => setFormData({ ...formData, id_curso: e.target.value })}
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Semestre"
            value={formData.semestre}
            onChange={(e) => setFormData({ ...formData, semestre: e.target.value })}
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={formData.estado}
            onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
            className="border border-gray-300 p-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ACTIVA">ACTIVA</option>
            <option value="INACTIVA">INACTIVA</option>
          </select>
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          Registrar Matrícula
        </button>
      </form>

      {/* Tabla */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="px-4 py-2 text-gray-600">ID Matrícula</th>
              <th className="px-4 py-2 text-gray-600">Estudiante</th>
              <th className="px-4 py-2 text-gray-600">Curso</th>
              <th className="px-4 py-2 text-gray-600">Semestre</th>
              <th className="px-4 py-2 text-gray-600">Estado</th>
            </tr>
          </thead>
          <tbody>
            {matriculas.map((m) => (
              <tr key={m.id_matricula} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-2 text-gray-700">{m.id_matricula}</td>
                <td className="px-4 py-2 text-gray-700">
                  {m.estudiante_nombre} {m.estudiante_apellido}
                </td>
                <td className="px-4 py-2 text-gray-700">{m.nombre_curso}</td>
                <td className="px-4 py-2 text-gray-700">{m.semestre}</td>
                <td className="px-4 py-2">
                  {m.estado === "ACTIVA" ? (
                    <span className="px-3 py-1 inline-flex text-xs font-semibold rounded-full bg-green-100 text-green-700 border">
                      Activa
                    </span>
                  ) : (
                    <span className="px-3 py-1 inline-flex text-xs font-semibold rounded-full bg-red-100 text-red-700 border">
                      Inactiva
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}