"use client";
import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";

export default function Header(){
    const [darkMode, setDarkMode] = useState(false);
    return( 
        <header className='bg-white flex justify-between items-center p-4 shadow-sm border-b border-gray-100 h-20'>
            <h1 className='text-2xl font-bold'>StudenDash</h1>
            <div className='flex items-center gap-4'>
                <span className='text-sm text-gray-500'>Hey There!, Student</span>
                
                <div className='bg-green-600 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold'>
                    <FaRegUserCircle className='text-white text-xl' />
                </div>

                <div className='flex justify-center'>
                    {darkMode ? <button onClick={() => setDarkMode(false)} className='bg-yellow-400 p-2 rounded-full'>🌞</button> : <button onClick={() => setDarkMode(true)} className='bg-gray-800 p-2 rounded-full'>🌙</button   >}
                </div>
            </div>
        </header>
    );
}