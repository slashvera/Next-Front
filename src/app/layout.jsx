import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
          {/* Sidebar */}
          <Sidebar />

          {/* Contenido derecho */}
          <div className="flex flex-col flex-1 min-w-0">
            <Header />

            <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
              {children} {/* ← ESTO REEMPLAZA <Outlet /> */}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
