"use client";

import { useState } from "react";
import CursoList from "@/components/foradmin/CursoList";
import CursoForm from "@/components/foradmin/CursoForm";
import Modal from "@/components/Modal";

export default function CursosPage() {
  const [open, setOpen] = useState(false);
  const [cursoId, setCursoId] = useState(null);

  const handleAdd = () => {
    setCursoId(null); // modo creación
    setOpen(true);
  };

  const handleEdit = (id) => {
    setCursoId(id); // modo edición
    setOpen(true);
  };


  return (
    <>
      {/* Lista de cursos, con callback para crear o editar */}
      <CursoList onAdd={handleAdd} onEdit={handleEdit} />

      {/* Modal con el formulario */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={cursoId ? "Editar curso" : "Agregar curso"}
      >
        <CursoForm
          cursoId={cursoId} // aquí pasamos el id del curso
          onClose={() => setOpen(false)}
          onSuccess={() => setOpen(false)}
        />
      </Modal>
    </>
  );

}