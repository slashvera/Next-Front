import StudentSidebar from "@/components/StudentComponents/StudentSidebar";
import StudentHeader from "@/components/StudentComponents/StudentHeader";

export default function StudentLayout({ children }) {
  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <StudentSidebar />

      {/* Contenido derecho */}
      <div className="flex flex-col flex-1 min-w-0">
        <StudentHeader />

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          {children} 
        </main>
      </div>
    </div>
  );
}
