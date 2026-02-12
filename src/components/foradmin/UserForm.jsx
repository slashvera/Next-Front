"use client";
import { useForm } from "react-hook-form";
import { createUser, updateUser, getUser } from "@/api/users";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { useNotify } from "@/hooks/useNotify";
import { useParams } from "next/navigation";

export default function UserForm({ userId, onSuccess }) {

    const router = useRouter();
    const notify = useNotify();
    const params = useParams();

    const [showPasswordFields, setShowPasswordFields] = useState(false);

    const{
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues:{
            id: "",
            username: "",
            email: "",
            is_active: true,
        }
    });

    const password = watch("password");
    const isActive = watch("is_active");
    
    // ============ Cargar Usuario (Editar) ============//
    useEffect(() => {
        if (!userId) return;

        const loadUser = async () => {
            try {
            const res = await getUser(userId);

            reset({
                id: res.data.id ?? "",
                username: res.data.username ?? "",
                email: res.data.email ?? "",
                is_active: res.data.is_active ?? true,
            });
            } catch (error) {
            notify.error("Error cargando el usuario");
            }
        };
        loadUser();
    }, [userId, reset]);


    {/* Enviar el Formulario */}

    const onSubmit = async (data) => {
        try{
            if(!showPasswordFields){
                delete data.password;
                delete data.confirm_password;
            }

            if(userId){
                await updateUser(userId, data);
                notify.success("Usuario actualizado correctamente");
            } else {
                await createUser(data);
                notify.success("Usuario creado correctamente");
            }

            router.refresh();
            onSuccess();
        }catch(error){
            notify.error("Error al guardar el usuario");
        }
    };  

    return (

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg
                    max-h-[90vh] overflow-y-auto space-y-4"
            >
                <h1 className="text-2xl font-bold text-center mb-4">
                Formulario de Usuario
                </h1>

                {/* Username */}
                <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Username</label>
                <input
                    placeholder="Username"
                    {...register("username", { required: "Username requerido" })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg
                        focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                {errors.username && (
                    <p className="text-error text-sm">{errors.username.message}</p>
                )}
                </div>

                {/* Email */}
                <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Email</label>
                <input
                    placeholder="Email"
                    type="email"
                    {...register("email", {
                    required: "Email requerido",
                    pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Email inválido",
                    },
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg
                        focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                {errors.email && (
                    <p className="text-error text-sm">{errors.email.message}</p>
                )}
                </div>

                {/* Estado */}
                <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    {...register("is_active")}
                    className="w-5 h-5 accent-blue-600"
                />

                <span
                  className={`text-xs font-bold px-2 py-1 rounded ${
                  isActive
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
                    }`}
                >
                    {isActive ? "ACTIVO" : "INACTIVO"}
                </span>
                </div>

                {/* Toggle contraseña */}
                <button
                type="button"
                onClick={() => setShowPasswordFields(!showPasswordFields)}
                className="bg-blue-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg shadow transition duration-300"
                >
                {showPasswordFields
                    ? "Cancelar cambio de contraseña"
                    : "Modificar contraseña"}
                </button>

                {/* Password */}
                {showPasswordFields && (
                <>
                    <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Password</label>
                    <input
                        type="password"
                        {...register("password", {
                        minLength: {
                            value: 8,
                            message: "Mínimo 8 caracteres",
                        },
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
                            message:
                            "Debe incluir mayúscula, minúscula, número y carácter especial",
                        },
                        })}
                        className="w-full border rounded py-2 px-3 bg-base-200"
                    />
                    {errors.password && (
                        <p className="text-error text-sm">{errors.password.message}</p>
                    )}
                    </div>

                    <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        {...register("confirmPassword", {
                        validate: (value) =>
                            value === password || "Las contraseñas no coinciden",
                        })}
                        className="w-full border rounded py-2 px-3 bg-base-200"
                    />
                    {errors.confirmPassword && (
                        <p className="text-error text-sm">
                        {errors.confirmPassword.message}
                        </p>
                    )}
                    </div>
                </>
                )}

                {/* Botones */}
                <div className="mt-4 flex gap-2">
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg shadow transition duration-300"
                >
                    Submit
                </button>
                <button
                    type="button"
                    onClick={() => router.refresh()}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg shadow transition duration-300"
                >
                    Cancel
                </button>
                </div>
            </form>
  );
}