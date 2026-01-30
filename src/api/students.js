import axios from "axios";

const studentApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL + "/students/",
    headers: {
        "Content-Type": "application/json",
    },
})

// ============= CRUD ===============
export const getStudents = () => studentApi.get("/");
export const getStudent = (id_std) => studentApi.get(`/${id_std}`);
export const createStudent = (student) =>studentApi.post("/", student);
export const updateStudent = (id_std, student) => studentApi.put(`/${id_std}/`, student);
export const deleteStudent = (id_std) => studentApi.delete(`/${id_std}/`)

