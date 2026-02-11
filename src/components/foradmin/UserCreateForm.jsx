"use client";
import { useForm } from "react-hook-form";
import {  createUser } from "@/api/users";
import { useRouter,useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useNotify } from "@/hooks/useNotify";


export default function UserCreateForm({ onClose, onSuccess }) {
    const router = useRouter();
    const notify = useNotify();
    const params  = useParams();

    const{
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState:{errors, isSubmitting}
    } = useForm({
        defaultValues:{
            username: "",
            password: "",
            confirmPassword: "",
            email: "",
            is_active: false,
        }
    });


    const password = watch("password");
    const isActive = watch("is_active");

    //=== Enviar formulario ===//
    const onSubmit = async (data) =>{
        delete data.confirmPassword;

        await createUser(data);
        onClose?.();
        router.refresh();
        notify.success("Usuario creado exitosamente");
    };


    return (
    <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md">

      <h1 className="text-2xl font-bold text-center mb-6">
        Nuevo Usuario
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Username */}
        <div>
          <label className="block text-sm font-bold mb-1">Username</label>
          <input
            {...register("username", { required: "Usuario requerido" })}
            className="w-full border rounded px-3 py-2"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-bold mb-1">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Contraseña requerida",
              minLength: { value: 8, message: "Mínimo 8 caracteres" },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
                message:
                  "Debe incluir mayúscula, minúscula, número y carácter especial",
              },
            })}
            className="w-full border rounded px-3 py-2"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-bold mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            {...register("confirmPassword", {
              validate: (value) =>
                value === password || "Las contraseñas no coinciden",
            })}
            className="w-full border rounded px-3 py-2"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-bold mb-1">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Activo */}
        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded">
          <input
            type="checkbox"
            {...register("is_active")}
            className="w-5 h-5"
          />
          <span
            className={`text-xs font-bold px-2 py-1 rounded ${
              isActive
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {isActive ? "ACTIVO" : "INACTIVO"}
          </span>
        </div>

        {/* Botones */}
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
          >
            {isSubmitting ? "Guardando..." : "Guardar"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded w-full"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );


}