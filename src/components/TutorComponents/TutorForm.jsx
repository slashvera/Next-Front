"use client";
import { useForm } from "react-hook-form";
import { getTutor, updateTutor, createTutor } from "@/api/tutors";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getUser } from "@/api/users";
import { useNotify } from "@/hooks/useNotify";

export default function ({tutorId}){
    const router = useRouter();
    const[users, setUsers] = useState([]);
    const {success, error} = useNotify();

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState:{errors, isSubmitting}
    } = useForm({
        defaultValues:{
            is_active: true,
        }
    });

    //============== Cargar Usuarios =================//
    useEffect(() => {
        const loadUsers = async() =>{
            const response = await getUser();
            setUsers(response.data)
        };
        loadUsers();
    }, []);

    //=============== Cargar Tutores(Editar) ===============//
    useEffect(() => {
        if(!tutorId) return;
        
        const loadTutors = async () =>{
            const res = await getTutor(tutorId);
            reset(res.data);
        };
        loadTutors();
    }, [tutorId, reset]);

    //================= Submit(Form) =====================//
    const onSubmit = async (data) => {
        const {gender_display, id_tutor, ...payload} = data;
        if(tutorId){
            await updateTutor(tutorId, payload);
        }else{
            await createTutor(payload);
        }
        router.push("/tutors")
    };

    const isActive = watch("is_active");

    return(

        <div className="flex justify-center items-center min-h-screen bg-base-200">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-md bg-base-100 p-6 rounded-lg shadow-md"
            >
                <h1 className="text-2xl font-bold text-center mb-6">
                    Formulario de Tutor
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
                {...register("correo_tutor")}
                type="email"
                placeholder="Correo"
                className="input input-bordered w-full mb-3"
                />

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