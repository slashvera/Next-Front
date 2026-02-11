"use client";

import { useState } from "react";
import StudentList from "@/components/StudentComponents/StudentList";
import StudentForm from "@/components/StudentComponents/StudentForm";
import Modal from "@/components/Modal";

export default function StudentsPage() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <StudentList onAdd={() => setOpen(true)} />

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Agregar estudiante"
      >
        <StudentForm
          onClose={() => setOpen(false)}
          onSuccess={() => setOpen(false)}
        />
      </Modal>
    </>
  );
}
