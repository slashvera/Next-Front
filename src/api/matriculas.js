import axios from "axios";
import { getSession } from "next-auth/react";


const matriculasApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL + "/matriculas/",
    headers: {
        "Content-Type": "application/json",
    },
});

// ============= INTERCEPTOR DE SEGURIDAD =============
matriculasApi.interceptors.request.use(async (config) => {
    // Obtenemos la sesión de NextAuth
    const session = await getSession();
    
    // Si hay un token en la sesión, lo agregamos al header Authorization
    if (session?.user?.accessToken) {
        config.headers.Authorization = `Bearer ${session.user.accessToken}`;
    }
    
    return config;
}, (error) => {
    return Promise.reject(error);
});

//======== CRUD =========//
export const getMatriculas = () => matriculasApi.get("/");
export const createMatricula = (matricula) => matriculasApi.post("/",matricula);