"use client";
import UserList from "@/components/foradmin/UserList";
import UserCreateForm from "@/components/foradmin/UserCreateForm";
import Modal from "@/components/Modal";
import { useState } from "react";

export default function UsersPage() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <UserList onAdd={() => setOpen(true)} />

      <Modal open={open} onClose={() => setOpen(false)}>
        <UserCreateForm onSuccess={() => setOpen(false)} />
      </Modal>
    </>
  );
}