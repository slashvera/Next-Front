"use client";
import toast from "react-hot-toast";

const baseStyle = {
    borderRadius: "8px",
    fontWeight: "bold",
    fontSize: "16px",
    padding: "12px 16px",
};

export const useNotify = () => {
    // Es vital agregar el 'return' y envolver todo en llaves
    return {
        success: (message) => 
            toast.success(message, {
                style: {
                    ...baseStyle,
                    background: "#ECFDF5",
                    color: "#166534",
                },
                iconTheme: {
                    primary: "#16A34A",
                    secondary: "#FFFFFF",
                }
            }),

        error: (message) =>
            toast.error(message, {
                style: {
                    ...baseStyle,
                    background: "#FEF3F2",
                    color: "#DC2626",
                },
                iconTheme: {
                    primary: "#DC2626",
                    secondary: "#FFFFFF",
                }
            }),

        warning: (message) =>
            toast(message, {
                icon: "⚠️", 
                style: {   
                    
                    ...baseStyle,
                    background: "#FFFBEB",
                    color: "#B45309",
                },
                
            }),
    };
};