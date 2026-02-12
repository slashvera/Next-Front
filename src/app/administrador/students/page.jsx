"use client";

import { useState } from "react";
import StudentList from "@/components/StudentComponents/StudentList";
import StudentForm from "@/components/StudentComponents/StudentForm";
import Modal from "@/components/Modal";

export default function StudentsPage() {
  const [open, setOpen] = useState(false);
  const [studentId, setstudentId] = useState(null);

  //============ Manejadores =========/
  const handleAdd = () => {
    setstudentId(null); // modo creación
    setOpen(true);
  };

  const handleEdit = (id) => {
    setstudentId(id); // modo edición
    setOpen(true);
  };

  return (
    <>
     {/* Lista de cursos, con callback para crear o editar */}
      <StudentList onAdd={handleAdd} onEdit={handleEdit} />

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={studentId ? "Editar Estudiante" : "Agregar Estudiante"}
      >
      <StudentForm
        studentId={studentId} // aquí pasamos el id del curso
        onClose={() => setOpen(false)}
        onSuccess={() => setOpen(false)}
      />
      </Modal>
    </>
  );
}
