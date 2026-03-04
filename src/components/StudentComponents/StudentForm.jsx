"use client";
import { useForm } from "react-hook-form";
import { createStudent, getStudent, updateStudent } from "@/api/students";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUsers } from "@/api/users";
import { useNotify } from "@/hooks/useNotify";

export default function StudentForm({ studentId, onSuccess }) {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const notify = useNotify();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      correo_std: "",   // 👈 nombre correcto
      fecha_nac: "",
      city_std: "",
      gender: "",
      user: "",
      is_active: true,
    },
  });

  // Cargar usuarios para el dropdown
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await getUsers();
        setUsers(res.data);
      } catch (error) {
        console.error("Error cargando usuarios", error);
      }
    };
    loadUsers();
  }, []);

  // Cargar estudiante si estamos editando
  useEffect(() => {
    if (!studentId) return;

    const loadStudent = async () => {
      try {
        const res = await getStudent(studentId);
        const studentdata = {
          first_name: res.data.first_name || "",
          last_name: res.data.last_name || "",
          correo_std: res.data.correo_std || "",   // 👈 coincide con serializer
          fecha_nac: res.data.fecha_nac || "",
          city_std: res.data.city_std || "",
          gender: res.data.gender || "",
          user: res.data.user || "",
          is_active: res.data.is_active ?? true,
        };
        reset(studentdata);
      } catch (error) {
        console.error("Error cargando estudiante", error);
      }
    };
    loadStudent();
  }, [studentId, reset]);

  // Submit handler
  const onSubmit = async (data) => {
    try {
      if (studentId) {
        await updateStudent(studentId, data);
        notify.success("¡Estudiante actualizado con éxito!");
      } else {
        await createStudent(data);
        notify.success("¡Estudiante agregado correctamente!");
      }
      onSuccess?.();
      router.refresh();
    } catch (error) {
      console.error("Error response:", error.response?.data);
      const serverErrors = error.response?.data;
      if (serverErrors?.first_name) {
        notify.warning("El nombre es un campo obligatorio.");
      } else if (serverErrors?.last_name) {
        notify.warning("El apellido es un campo obligatorio.");
      } else if (serverErrors?.user) {
        notify.error("Debe seleccionar un usuario válido.");
      } else if (serverErrors?.correo_std) {
        notify.error("Debe ingresar un correo válido.");
      } else {
        notify.error("No se pudo guardar el estudiante. Revisa los datos.");
      }
    }
  };

  const isActive = watch("is_active");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full space-y-4 shadow-lg rounded-lg p-6 bg-white"
    >
      <h1 className="text-2xl font-bold text-center mb-4">
        Formulario de Estudiante
      </h1>

      {/* Nombre */}
      <div>
        <input
          {...register("first_name", { required: "Nombre requerido" })}
          placeholder="Nombre"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        {errors.first_name && (
          <p className="text-red-500 text-sm mt-1">
            {errors.first_name.message}
          </p>
        )}
      </div>

      {/* Apellido */}
      <input
        {...register("last_name", { required: "Apellido requerido" })}
        placeholder="Apellido"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
      />

      {/* Género */}
      <select
        {...register("gender", { required: true })}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white"
      >
        <option value="">Seleccione Género</option>
        <option value="M">Masculino</option>
        <option value="F">Femenino</option>
        <option value="O">Otro</option>
      </select>

      {/* Correo */}
      <input
        {...register("correo_std", { required: "Correo requerido" })}
        type="email"
        placeholder="Correo"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
      />
      {errors.correo_std && (
        <p className="text-red-500 text-sm mt-1">{errors.correo_std.message}</p>
      )}

      {/* Fecha de nacimiento */}
      <input
        {...register("fecha_nac")}
        type="date"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
      />

      {/* Ciudad */}
      <select
        {...register("city_std")}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white"
      >
        <option value="">Seleccione Ciudad</option>
        <option value="Managua">Managua</option>
        <option value="Masaya">Masaya</option>
      </select>

      {/* Usuario */}
      <select
        {...register("user", { required: true })}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white"
      >
        <option value="">Seleccione un usuario</option>
        {users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.username}
          </option>
        ))}
      </select>

      {/* Estado activo */}
      <div className="flex items-center gap-3">
        <input type="checkbox" {...register("is_active")} />
        <span
          className={`text-xs font-bold px-2 py-1 rounded ${
            isActive ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {isActive ? "ACTIVO" : "INACTIVO"}
        </span>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
      >
        {isSubmitting ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}