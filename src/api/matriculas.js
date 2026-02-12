import axios from "axios"

const matriculasApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL + "/matriculas/",
    headers: {
        "Content-Type": "application/json",
    },
});

//======== CRUD =========//
export const getMatriculas = () => matriculasApi.get("/");
export const createMatricula = (matricula) => matriculasApi.post("/",matricula);