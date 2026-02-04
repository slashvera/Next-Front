"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from '@/assets/logo-side.svg'

//============== Import Icons ==============//
import { MdMenuOpen, MdOutlineLogout } from 'react-icons/md'
import { MdOutlineHome } from "react-icons/md";//Icono para Home/Inicio
import { LuBookOpenCheck } from "react-icons/lu";// Icono para MisCursos
import { RiCalendarScheduleLine } from "react-icons/ri";//Icono para mihorario
import { FaRegUser } from "react-icons/fa";//Icono para Mis datos

const menuItems =[
    {icons: <MdOutlineHome size={22} />, label: "Inicio", path: "/dashboard"},
    {icons: <MdOutlineLibraryAdd size={22} />, label: "Mis Cursos", path:"/cursos"},
    {icons: <RiCalendarScheduleLine size={22}/>, label:"Mi Horario", path:"/horarios"},
    {icons: <FaRegUser size={22}/>, label:"Mis Datos", path:"/student"},
    {icons: <MdOutlineLogout size={22}/>, label:"Logout", path:"/auth"},
];

export default function StudentSidebar(){
    const [open, setOpen] = useState(true);
    const pathname = usePathname();

    return(

        <nav
            className={`shadow-md h-screen p-2 flex flex-col duration-500 bg-green-600 text-white ${
                open ? "w-60" : "w-16"
            }`}
            >
            {/* Logo y Toggle */}
            <div className="px-3 py-2 h-20 flex justify-between items-center">
                <Image
                src={logo}
                alt="Logo"
                className={`${open ? "w-10" : "w-0"} bg-white rounded-md duration-500`}
                />

                <div onClick={() => setOpen(!open)} className="cursor-pointer">
                <MdMenuOpen
                    size={34}
                    className={`duration-500 ${!open && "rotate-180"}`}
                />
                </div>
            </div>

            {/* Menú */}
            <ul className="flex-1">
                {menuItems.map((item, index) => {
                const isActive = pathname === item.path;

                return (
                    <li key={index} className="my-2">
                    <Link
                        href={item.path}
                        className={`
                        px-3 py-2 rounded-md duration-300 flex gap-2 items-center relative group
                        ${
                            isActive
                            ? "bg-blue-800 border-l-4 border-white shadow-lg"
                            : "hover:bg-blue-500"
                        }
                        `}
                    >
                        <div>{item.icons}</div>

                        <p
                        className={`${!open && "w-0 translate-x-24"} duration-500 overflow-hidden whitespace-nowrap`}
                        >
                        {item.label}
                        </p>

                        {/* Tooltip */}
                        {!open && (
                        <p className="absolute left-32 shadow-md rounded-md w-0 p-0 text-black bg-white duration-100 overflow-hidden group-hover:w-fit group-hover:p-2 group-hover:left-16 z-50">
                            {item.label}
                        </p>
                        )}
                    </Link>
                    </li>
                );
                })}
            </ul>

            {/* Footer */}
            <div className="border-t border-blue-400 pt-4">

                <div className="px-2 py-2 mb-4 hover:bg-red-500 rounded-md flex items-center gap-2 cursor-pointer duration-300">
                    <MdOutlineLogout size={22} />
                    <p
                        className={`${!open && "w-0 opacity-0"} duration-500 overflow-hidden font-bold text-xs`}
                    >
                        Logout
                    </p>
                </div>
            </div>
        </nav>
    );
}