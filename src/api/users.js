import axios from "axios";
import { getSession } from "next-auth/react";


const userApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL + "/register/",
    headers: {
        "Content-Type": "application/json",
    },
});

// ============= INTERCEPTOR DE SEGURIDAD =============
userApi.interceptors.request.use(async (config) => {
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


//=========== CRUD ==========//
export const getUsers = () => userApi.get("/");
export const getUser = (id) => userApi.get(`/${id}/`);
export const createUser = (user) => userApi.post("/",user);
export const updateUser = (id, user ) => userApi.put(`/${id}/`, user);
export const deleteUser  = (id) => userApi.delete(`/${id}/`);