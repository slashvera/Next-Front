import axios from "axios";
import { getSession } from "next-auth/react";

const tutorApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL + "/tutors/",
    headers: {
        "Content-Type": "application/json",
    },
});


// ============= INTERCEPTOR DE SEGURIDAD =============
tutorApi.interceptors.request.use(async (config) => {
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
export const getTutors = () => tutorApi.get("/");
export const getTutor = (id_tutor) => tutorApi.get(`/${id_tutor}/`);
export const createTutor = (tutor) => tutorApi.post("/",tutor);
export const updateTutor = (id_tutor, tutor) => tutorApi.put(`/${id_tutor}/`, tutor);
export const deleteTutor  = (id_tutor) =>tutorApi.delete(`/${id_tutor}/`);