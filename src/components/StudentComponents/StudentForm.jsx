"use client";
import { useForm } from "react-hook-form";
import { createStudent, getStudent, updateStudent } from "@/api/students";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUser, getUsers } from "@/api/users";
import { useNotify } from "@/hooks/useNotify";

export default function StudentForm({studentId, onSuccess}) {
    const router = useRouter();
    const [users, setUsers] = useState([]);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting}
    } = useForm({
        defaultValues: {
            is_active: true,
        }
    });

    // ============ Cargar usuarios =========//
    useEffect(() => {
        const loadUsers = async () =>{
            const res = await getUsers();
            setUsers(res.data);
        };
        loadUsers();
    }, []);

    //============ Cargar Estudiante (Editar) ============//
    useEffect(() =>{
        if(!studentId)  return;

        const loadStudents = async () =>{
            const res = await getStudent(studentId);
            reset(res.data);
        };
        loadStudents(); 
    }, [studentId, reset]);

    //=========== Submit(Form) ============//
    const onSubmit = async (data) =>{
        const {gender_display, id_std, ...payload} = data;

        if(studentId){
            await updateStudent(studentId, payload);
        }else{
            await createStudent(payload)
        }
        onSuccess();
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
            <option value="">Seleccione género</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Other</option>
            </select>

            {/* Email */}
            <input
            {...register("correo_std")}
            type="email"
            placeholder="Correo"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />

            {/* Fecha */}
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

            {/* Activo */}
            <div className="flex items-center gap-3">
            <input type="checkbox" {...register("is_active")} />
            <span className={`text-xs font-bold px-2 py-1 rounded
                ${isActive ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
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