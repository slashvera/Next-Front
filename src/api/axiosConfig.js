import axios from "axios";
import { getSession } from "next-auth/react";

const apiInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers:{
      "Content-Type": "application/json",  
    }
});

// El interceptor se aplica a ESTA instancia una sola vez
apiInstance.interceptors.request.use(async (config) => {
    const session = await getSession();
    if (session?.user?.accessToken) {
        config.headers.Authorization = `Bearer ${session.user.accessToken}`;
    }
    return config;
});

apiInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Si el token no sirve, podrías importar { signOut } de next-auth/react
            // y sacar al usuario al login
            console.error("Sesión expirada o no autorizada");
        }
        return Promise.reject(error);
    }
);

export default apiInstance;