import axios from "axios";

const tutorApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL + "/tutors/",
    headers: {
        "Content-Type": "application/json",
    },
});


//======== CRUD =========//
export const getTutors = () => tutorApi.get("/");
export const getTutor = (id_tutor) => tutorApi.get(`/${id_tutor}/`);
export const createTutor = (tutor) => tutorApi.post("/",tutor);
export const updateTutor = (id_tutor, tutor) => tutorApi.put(`/${id_tutor}/`, tutor);
export const deleteTutor  = (id_tutor) =>tutorApi.delete(`/${id_tutor}/`);