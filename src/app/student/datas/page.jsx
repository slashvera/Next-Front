"use client";

import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import axios from "axios";
import { useNotify } from "@/hooks/useNotify";

export default function MisDatosPage() {
  const [student, setStudent] = useState(null);
  const notify = useNotify();

  useEffect(() => {
    const loadStudent = async () => {
      try {
        const session = await getSession();
        if (!session?.user?.accessToken) {
          notify.error("No hay sesión activa");
          return;
        }

        // Llamada al endpoint de estudiantes
        const res = await axios.get(
          process.env.NEXT_PUBLIC_API_URL + "/students/me/",
          {
            headers: {
              Authorization: `Bearer ${session.user.accessToken}`,
            },
          }
        );

        setStudent(res.data);
      } catch (error) {
        console.error("Error cargando datos del estudiante", error);
        notify.error("No se pudieron cargar tus datos");
      }
    };

    loadStudent();
  }, []);

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold mb-6">Mis Datos</h1>

        {!student ? (
          <p className="text-gray-600">No se encontraron datos del estudiante.</p>
        ) : (
          <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
            <p>
              <span className="font-semibold">Nombre:</span>{" "}
              {student.first_name} {student.last_name}
            </p>
            <p>
              <span className="font-semibold">Correo:</span>{" "}
              {student.correo_std || "No registrado"}
            </p>
            <p>
              <span className="font-semibold">Ciudad:</span>{" "}
              {student.city_std || "No registrado"}
            </p>
            <p>
              <span className="font-semibold">Fecha de nacimiento:</span>{" "}
              {student.fecha_nac || "No registrada"}
            </p>
            <p>
              <span className="font-semibold">Género:</span>{" "}
              {student.gender === "M"
                ? "Masculino"
                : student.gender === "F"
                ? "Femenino"
                : "Otro"}
            </p>
            <p>
              <span className="font-semibold">Estado:</span>{" "}
              {student.is_active ? "Activo" : "Inactivo"}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}