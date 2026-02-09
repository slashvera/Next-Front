import axios from "axios";

const userApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL + "/register/",
    headers: {
        "Content-Type": "application/json",
    },
});

//=========== CRUD ==========//
export const getUsers = () => userApi.get("/");
export const getUser = (id) => userApi.get(`/${id}/`);
export const createUser = (user) => userApi.post("/",user);
export const updateUser = (id, user ) => userApi.put(`/${id}/`, user);
export const deleteUser  = (id) => userApi.delete(`/${id}/`);