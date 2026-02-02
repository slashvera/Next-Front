"use client";
import React, { useState } from "react";
import { getStudents } from "@/api/students";
import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function StudentList(){
    
    const  pathname = usePathname(); // Obtenemos la ruta actual, ej: "/about"
};