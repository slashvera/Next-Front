"use client";
import { SessionProvider } from "next-auth/react";


// SesssionProvider sirve para envolver toda la aplicación y proporcionar
//  el contexto de autenticación a todos los componentes hijos. 
// Esto permite que cualquier componente pueda acceder a la información de sesión
//  del usuario, como si está autenticado, su nombre de usuario, rol, etc.,
//  sin necesidad de pasar props manualmente a través de cada nivel de la aplicación.
export default function Providers({ children }) {
    return <SessionProvider>{children}</SessionProvider>;
}