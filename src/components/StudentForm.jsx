"use client";
import { useForm } from "react-hook-form";
import { createStudent, getStudent, updateStudent } from "@/api/students";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getUser } from "@/api/users";

export default function StudentForm({studentId}){
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
            const res = await getUser();
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
        router.push("/students")
    };

    const isActive = watch("is_active");

    return (
        <div className="flex justify-center items-center min-h-screen bg-base-200">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-md bg-base-100 p-6 rounded-lg shadow-md"
            >
                <h1 className="text-2xl font-bold text-center mb-6">
                    Formulario de Estudiante
                </h1>

                {/* Nombre */}
                <input
                {...register("first_name", { required: "Nombre requerido" })}
                placeholder="Nombre"
                className="input input-bordered w-full mb-3"
                />
                {errors.first_name && (
                <p className="text-error text-sm">{errors.first_name.message}</p>
                )}

                {/* Apellido */}
                <input
                {...register("last_name", { required: "Apellido requerido" })}
                placeholder="Apellido"
                className="input input-bordered w-full mb-3"
                />

                {/* Género */}
                <select
                {...register("gender", { required: true })}
                className="select select-bordered w-full mb-3"
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
                className="input input-bordered w-full mb-3"
                />

                {/* Fecha */}
                <input
                {...register("fecha_nac")}
                type="date"
                className="input input-bordered w-full mb-3"
                />

                {/* Ciudad */}
                <select
                {...register("city_std")}
                className="select select-bordered w-full mb-3"
                >
                <option value="Managua">Managua</option>
                <option value="Masaya">Masaya</option>
                </select>

                {/* Usuario */}
                <select
                {...register("user", { required: true })}
                className="select select-bordered w-full mb-3"
                >
                <option value="">Seleccione un usuario</option>
                {users.map((u) => (
                    <option key={u.id} value={u.id}>
                    {u.username}
                    </option>
                ))}
                </select>

                {/* Activo */}
                <div className="flex items-center gap-3 mb-6">
                <input
                    type="checkbox"
                    {...register("is_active")}
                    className="checkbox checkbox-primary"
                />
                <span className={`text-xs font-bold px-2 py-1 rounded
                    ${isActive ? "bg-success text-white" : "bg-error text-white"}`}>
                    {isActive ? "ACTIVO" : "INACTIVO"}
                </span>
                </div>

                {/* Botones */}
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