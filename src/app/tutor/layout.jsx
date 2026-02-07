import TutorSidebar from "@/components/TutorComponents/TutorSidebar";
import TutorHeader from "@/components/TutorComponents/TutorHeader";

export default function TutorLayout({ children }) {
  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
      <TutorSidebar />
      <div className="flex-1 flex flex-col">
        <TutorHeader />
        <main className="flex-1 overflow-auto p-4">{children}</main>
      </div>
    </div>
  );
}
