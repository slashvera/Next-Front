import axios from "axios"

const cursoApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL + "/cursos/",
    headers: {
        "Content-Type": "application/json",
    },
});

//======== CRUD =========//
export const getCursos = () => cursoApi.get("/");
export const getCurso = (id_curso) => cursoApi.get(`/${id_curso}/`);
export const createCurso = (curso) => cursoApi.post("/",curso);
export const updateCurso = (id_curso, curso) => cursoApi.put(`/${id_curso}/`, curso);
export const deleteCurso  = (id_curso) =>cursoApi.delete(`/${id_curso}/`);