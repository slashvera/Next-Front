import React from "react";
import AdminSidebar from "@/components/foradmin/AdminSidebar";
import AdminHeader from "@/components/foradmin/AdminHeader";

export default function AdminLayout({ children }) {
    return(
        <div className="flex h-screen w-full bg-gray-100 overflow-hidden">
              {/* Sidebar */}
              <AdminSidebar />
        
              {/* Contenido derecho */}
              <div className="flex flex-col flex-1 min-w-0">
                <AdminHeader />
        
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
                  {children} 
                </main>
              </div>
            </div>
    );
}