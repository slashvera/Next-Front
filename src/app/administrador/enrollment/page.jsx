"use client";

import { useState, useEffect } from "react";
import EnrollmentPage from "@/components/foradmin/Enrollment";
import Modal from "@/components/Modal";

export default function MatriculasPage() {
  return (
    <div className="p-6">
      <EnrollmentPage />
    </div>
  );
}