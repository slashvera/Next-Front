"use client";

import { useForm } from "react-hook-form";
import { createUser, getUser, updateUser } from "@/api/users";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UserForm({ userId }) {
  const router = useRouter();

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

  // Load user if editing
  useEffect(() => {
    if (!userId) return;

    const loadUser = async () => {
      const res = await getUser(userId);
      reset(res.data);
    };
    loadUser();
  }, [userId, reset]);

  // Submit handler
  const onSubmit = async (data) => {
    const { id, ...payload } = data;

    if (userId) {
      await updateUser(userId, payload);
    } else {
      await createUser(payload);
    }
    router.push("/users");
  };

  const isActive = watch("is_active");

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-base-100 p-6 rounded-lg shadow-md"
      >
        <h1 className="text-2xl font-bold text-center mb-6">
          Formulario de Usuario
        </h1>

        {/* Username */}
        <input
          {...register("username", { required: "Nombre de usuario requerido" })}
          placeholder="Username"
          className="input input-bordered w-full mb-3"
        />
        {errors.username && (
          <p className="text-error text-sm">{errors.username.message}</p>
        )}

        {/* Email */}
        <input
          {...register("email", { required: "Correo requerido" })}
          type="email"
          placeholder="Correo"
          className="input input-bordered w-full mb-3"
        />
        {errors.email && (
          <p className="text-error text-sm">{errors.email.message}</p>
        )}

        {/* Activo */}
        <div className="flex items-center gap-3 mb-6">
          <input
            type="checkbox"
            {...register("is_active")}
            className="checkbox checkbox-primary"
          />
          <span
            className={`text-xs font-bold px-2 py-1 rounded ${
              isActive ? "bg-success text-white" : "bg-error text-white"
            }`}
          >
            {isActive ? "ACTIVO" : "INACTIVO"}
          </span>
        </div>

        {/* Botón */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary w-full"
        >
          {isSubmitting ? "Guardando..." : "Guardar"}
        </button>
      </form>
    </div>
  );
}