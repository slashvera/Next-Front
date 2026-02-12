"use client";
import { useForm } from "react-hook-form";
import { getTutor, updateTutor, createTutor } from "@/api/tutors";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUsers, getUser } from "@/api/users";
import { useNotify } from "@/hooks/useNotify";

export default function TutorForm({ tutorId, onClose, onSuccess }) {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const { success, error } = useNotify();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      is_active: true,
    },
  });

  // ============ Cargar usuarios =========//
    useEffect(() => {
      const loadUsers = async () =>{
      const res = await getUsers();
      setUsers(res.data);
      };
      loadUsers();
    }, []);

  // Cargar tutor si es edición
  useEffect(() => {
    if (!tutorId) return;

    const loadTutor = async () => {
      try {
        const res = await getTutor(tutorId);

        const tutorData = {
          first_name: res.data.first_name || "",
          last_name: res.data.last_name || "",
          gender: res.data.gender || "",
          correo_tutor: res.data.correo_tutor || "",
          user: res.data.user || "",
          is_active: res.data.is_active || false,
        };

        reset(tutorData);
      } catch (err) {
        console.error("Error cargando tutor", err);
      }
    };
    loadTutor();
  }, [tutorId, reset]);

  // Submit
  const onSubmit = async (data) => {
    const { gender_display, id_tutor, ...payload } = data;
    try {
      if (tutorId) {
        await updateTutor(tutorId, payload);
        success("Tutor actualizado correctamente");
      } else {
        await createTutor(payload);
        success("Tutor creado correctamente");
      }
      onSuccess();
    } catch (err) {
      error("Error guardando tutor");
      console.error(err);
    }
  };

  const isActive = watch("is_active");

  return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full space-y-4 shadow-lg rounded-lg p-6 bg-white"
      >
        <h1 className="text-2xl font-bold text-center mb-4">
          Formulario de Tutor
        </h1>

        {/* Nombre */}
        <div>
          <input
            {...register("first_name", { required: "Nombre requerido" })}
            placeholder="Nombre"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg
                       focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {errors.first_name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.first_name.message}
            </p>
          )}
        </div>

        {/* Apellido */}
        <div>
          <input
            {...register("last_name", { required: "Apellido requerido" })}
            placeholder="Apellido"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg
                       focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Género */}
        <div>
          <select
            {...register("gender", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white
                       focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Seleccione género</option>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
            <option value="O">Otro</option>
          </select>
        </div>

        {/* Email */}
        <div>
          <input
            {...register("correo_tutor")}
            type="email"
            placeholder="Correo"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg
                       focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Usuario */}
        <div>
            <select
            {...register("user", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white
                        focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
            <option value="">Seleccione un usuario</option>
            {users.map((u) => (
                <option key={u.id} value={u.id}>
                {u.username}
                </option>
            ))}
            </select>
        </div>

        {/* Activo */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            {...register("is_active")}
            className="w-5 h-5 accent-blue-600"
          />
          <span
            className={`text-xs font-bold px-2 py-1 rounded ${
              isActive ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}
          >
            {isActive ? "ACTIVO" : "INACTIVO"}
          </span>
        </div>

        {/* Botón */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white
                     font-semibold py-2 rounded-lg transition"
        >
          {isSubmitting ? "Guardando..." : "Guardar"}
        </button>
      </form>
  );
}