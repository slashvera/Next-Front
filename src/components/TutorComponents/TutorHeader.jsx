"use client";
import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";


export default function TutorHeader(){
    const [darkMode, setDarkMode] = useState(false);
    return( 
        <header className='bg-white flex justify-between items-center p-4 shadow-sm border-b border-gray-100 h-20'>
            <h1 className='text-2xl font-bold'>TutorDash</h1>
            <div className='flex items-center gap-4'>
                <span className='text-sm text-gray-500'>Hello, Tutor</span>
                <FaRegUserCircle className="text-2xl text-gray-500" />
            </div>
        </header>
    );
}