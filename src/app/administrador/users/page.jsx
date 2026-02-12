"use client";
import UserList from "@/components/foradmin/UserList";
import UserCreateForm from "@/components/foradmin/UserCreateForm";
import UserForm from "@/components/foradmin/UserForm";
import Modal from "@/components/Modal";
import { useState } from "react";

export default function UsersPage() {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState(null);

  // Crear usuario
  const handleAdd = () => {
    setUserId(null);
    setOpen(true);
  };

  // Editar usuario
  const handleEdit = (id) => {
    setUserId(id);
    setOpen(true);
  };

  return (
    <>
      <UserList onAdd={handleAdd} onEdit={handleEdit} />

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={userId ? "Editar Usuario" : "Agregar Usuario"}
      >
        {userId ? (
          <UserForm
            userId={userId}
            onClose={() => setOpen(false)}
            onSuccess={() => setOpen(false)}
          />
        ) : (
          <UserCreateForm
            onClose={() => setOpen(false)}
            onSuccess={() => setOpen(false)}
          />
        )}
      </Modal>
    </>
  );
}
