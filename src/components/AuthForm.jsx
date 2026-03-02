"use client";
import { useState } from "react";
import { User, Lock, Loader2, ShieldUser } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  // 1. Estados definidos correctamente (Solución de tu amigo)
  const [formData, setFormData] = useState({ 
    username: "", 
    password: "" 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 2. Manejador de entrada (Solución de tu amigo)
  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Manejador de envío ( redirección por rol real)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      redirect: false,
      username: formData.username,
      password: formData.password,
    });

    if (result?.error) {
      setError("Credenciales incorrectas");
      setLoading(false);
    } else {
      // OBTENEMOS EL ROL REAL DESDE LA SESIÓN (No del formulario)
      const res = await fetch("/api/auth/session");
      const session = await res.json();
      
      const role = session?.user?.role;
      const isSuper = session?.user?.is_superuser;

      // Redirección inteligente
      if (role === "admin" || isSuper) {
        router.push("/administrador/dashboard");
      } else if (role === "tutors") {
        router.push("/tutor/dashboard");
      } else if (role === "students") {
        router.push("/student/dashboard");
      } else {
        router.push("/");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-gray-800">
      <div className="text-center">
        <ShieldUser size={48} className="mx-auto text-blue-600" />
        <h2 className="text-3xl font-bold mt-2">Bienvenido</h2>
        <p className="text-gray-500 text-sm">Inicia sesión para continuar</p>
      </div>

      <div className="flex items-center gap-3 border p-3 rounded-xl focus-within:ring-2 focus-within:ring-blue-500 bg-gray-50">
        <User size={20} className="text-gray-500" />
        <input
          type="text"
          name="username"
          placeholder="Usuario"
          value={formData.username}
          onChange={handleInput}
          className="w-full bg-transparent outline-none"
          required
        />
      </div>

      <div className="flex items-center gap-3 border p-3 rounded-xl focus-within:ring-2 focus-within:ring-blue-500 bg-gray-50">
        <Lock size={20} className="text-gray-500" />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleInput}
          className="w-full bg-transparent outline-none"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 w-full text-white p-3 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:bg-blue-400"
      >
        {loading && <Loader2 className="animate-spin" />}
        {loading ? "Entrando..." : "Iniciar sesión"}
      </button>

      {error && (
        <div className="text-red-600 text-center bg-red-100 p-2 rounded-lg border border-red-300">
          {error}
        </div>
      )}
    </form>
  );
}