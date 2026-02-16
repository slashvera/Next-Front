"use client";
import { useState } from "react";
import { User, Lock, Loader2, ShieldUser} from "lucide-react";

export default function LoginPage() {


  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 text-gray-800"
    >
      <div className="text-center">
        <ShieldUser size={48} className="mx-auto text-blue-600" />
        <h2 className="text-3xl font-bold mt-2">Bienvenido</h2>
        <p className="text-gray-500 text-sm">Inicia sesión para continuar</p>
      </div>

      {/* Username */}
      <div className="flex items-center gap-3 border p-3 rounded-xl focus-within:ring-2 focus-within:ring-blue-500 bg-gray-50">
        <User size={20} className="text-gray-500" />
        <input
          type="text"
          name="username"
          placeholder="Usuario"
          value={formData.username}
          onChange={handleInput}
          className="w-full bg-transparent outline-none"
        />
      </div>

      {/* Password */}
      <div className="flex items-center gap-3 border p-3 rounded-xl focus-within:ring-2 focus-within:ring-blue-500 bg-gray-50">
        <Lock size={20} className="text-gray-500" />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleInput}
          className="w-full bg-transparent outline-none"
        />
      </div>

      {/* Role */}
      <select
        name="role"
        value={formData.role}
        onChange={handleInput}
        className="border p-3 rounded-xl w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="student">Estudiante</option>
        <option value="tutor">Tutor</option>
        <option value="admin">Administrador</option>
      </select>

      {/* Button */}
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 w-full text-white p-3 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:bg-blue-400"
      >
        {loading && <Loader2 className="animate-spin" />}
        {loading ? "Entrando..." : "Iniciar sesión"}
      </button>

      {/* Error */}
      {error && (
        <div className="text-red-600 text-center bg-red-100 p-2 rounded-lg border border-red-300">
          {error}
        </div>
      )}
    </form>
  );
}
