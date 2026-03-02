import axios from "axios";
import { getSession } from "next-auth/react";

const studentApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL + "/students/",
    headers: {
        "Content-Type": "application/json",
    },
});

// ============= INTERCEPTOR DE SEGURIDAD =============
studentApi.interceptors.request.use(async (config) => {
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

// ============= CRUD ===============
export const getStudents = () => studentApi.get("/");
export const getStudent = (id_std) => studentApi.get(`/${id_std}`);
export const createStudent = (student) =>studentApi.post("/", student);
export const updateStudent = (id_std, student) => studentApi.put(`/${id_std}/`, student);
export const deleteStudent = (id_std) => studentApi.delete(`/${id_std}/`)

