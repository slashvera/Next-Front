"use client";
import TutorList from "@/components/TutorComponents/TutorList";
import TutorForm from "@/components/TutorComponents/TutorForm";
import { useState } from "react";
import Modal from "@/components/Modal";

export default function TutorsPage() {

    const [open, setOpen] = useState(false);
    const [tutorId, setTutorId] = useState(null);

    const handleAdd = () => {
        setTutorId(null); // modo creación
        setOpen(true);
    };

    const handleEdit = (id) => {
        setTutorId(id); // modo edición
        setOpen(true);
    };

      return (
        <>
          <TutorList onAdd={handleAdd} onEdit={handleEdit} />
    
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            title={tutorId ? "Editar tutor" : "Agregar tutor"}
          >
            <TutorForm
              tutorId={tutorId} 
              onClose={() => setOpen(false)}
              onSuccess={() => setOpen(false)}
            />
          </Modal>
        </>
      );
}



