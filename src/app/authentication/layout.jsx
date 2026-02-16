import Logo from "@/assets/fondoLogin.jpg";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4 py-10">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* Panel izquierdo (formulario) */}
        <div className="p-10 flex items-center justify-center bg-white">
          <div className="w-full max-w-sm">
            {children}
          </div>
        </div>

        {/* Panel derecho (descripción clara) */}
        <div className="hidden md:flex flex-col justify-center p-12 relative bg-linear-to-br from-blue-50 to-blue-200">
          
          {/* Fondo decorativo */}
          <div className="absolute inset-0 opacity-100 bg-[url('@/assets/fondoLogin.jpg')] bg-cover bg-center mix-blend-overlay"></div>

          <div className="relative">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Bienvenido al Sistema Académico
            </h2>

            <p className="text-gray-700 text-lg leading-relaxed">
              Gestiona cursos, tutorías, estudiantes y paneles personalizados.
              Accede fácilmente a herramientas diseñadas para mejorar la organización
              y el flujo de trabajo.
            </p>

            <p className="mt-6 text-gray-600 text-sm">
              Plataforma multi-rol — Administradores, Tutores y Estudiantes.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
