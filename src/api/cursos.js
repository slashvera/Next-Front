import axios from "axios"
import { getSession } from "next-auth/react";

const cursoApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL + "/cursos/",
    headers: {
        "Content-Type": "application/json",
    },
});


// ============= INTERCEPTOR DE SEGURIDAD =============
cursoApi.interceptors.request.use(async (config) => {
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
export const getCursos = () => cursoApi.get("/");
export const getCurso = (id_curso) => cursoApi.get(`/${id_curso}/`);
export const createCurso = (curso) => cursoApi.post("/",curso);
export const updateCurso = (id_curso, curso) => cursoApi.put(`/${id_curso}/`, curso);
export const deleteCurso  = (id_curso) =>cursoApi.delete(`/${id_curso}/`);