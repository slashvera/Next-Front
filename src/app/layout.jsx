import Sidebar from "@/components/Sidebar"
import Header from "@/components/Header"

export default function Dashboardlayout({ children }){
  return(
    <div className=" flex h-screen w-full bg-gray-50 overflow-hidden">
      {/* Espacio para Sidebar*/}
      <Sidebar />

      {/* Contenido Header */}
      <div className="flex flex-col flex-1 min-w-0">
        <Header />

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          {children}
        </main>
      </div>

    </div>
  )
}
