"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from "@/assets/logo-side.svg";

//==== Icons ====//
import {
  MdMenuOpen,
  MdOutlineSettings,
  MdOutlineLogout,
  MdOutlineClass,
} from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import {
  PiStudentLight,
  PiChalkboardTeacher,
  PiUserLight,
} from "react-icons/pi";
import { TbReportSearch } from "react-icons/tb";

const menuItems = [
  { icon: <IoHomeOutline size={22} />, label: "Home", path: "/dashboard" },
  { icon: <PiUserLight size={22} />, label: "Users", path: "/dashboard/users" },
  {
    icon: <PiStudentLight size={22} />,
    label: "Students",
    path: "/dashboard/students",
  },
  {
    icon: <PiChalkboardTeacher size={22} />,
    label: "Teachers",
    path: "/dashboard/teachers",
  },
  {
    icon: <MdOutlineClass size={22} />,
    label: "Courses",
    path: "/dashboard/courses",
  },
  {
    icon: <TbReportSearch size={22} />,
    label: "Reports",
    path: "/dashboard/reports",
  },
];

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();

  return (
    <nav
      className={`shadow-md h-screen p-2 flex flex-col duration-500 bg-blue-600 text-white ${
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
                <div>{item.icon}</div>

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
        <div className="px-2 py-2 mb-2 hover:bg-blue-500 rounded-md flex items-center gap-2 cursor-pointer duration-300">
          <MdOutlineSettings size={22} />
          <p
            className={`${!open && "w-0 opacity-0"} duration-500 overflow-hidden font-bold text-xs`}
          >
            Settings
          </p>
        </div>

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
