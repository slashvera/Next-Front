"use client";
import { useForm } from "react-hook-form";
import { getCurso, updateCurso, createCurso } from "@/api/cursos";
import { getTutors } from "@/api/tutors";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useNotify } from "@/hooks/useNotify";

export default function CursoForm({ cursoId, onClose, onSuccess }) {
  const router = useRouter();
  const notify = useNotify();
  const [tutors, setTutors] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      codigo_curso: "",
      nombre_curso: "",
      year_curso: "",
      semestre_curso: "",
      creditos_curso: "",
      id_tutor: "",
    },
  });

  // Cargar tutores
  useEffect(() => {
    const loadTutors = async () => {
      try {
        const res = await getTutors();
        setTutors(res.data);
      } catch (error) {
        console.error("Error cargando tutores", error);
      }
    };
    loadTutors();
  }, []);

  // Cargar curso si es edición
  useEffect(() => {
    if (!cursoId) return;

    const loadCurso = async () => {
      try {
        const res = await getCurso(cursoId);

        const cursoData = {
          codigo_curso: res.data.codigo_curso || "",
          nombre_curso: res.data.nombre_curso || "",
          year_curso: res.data.year_curso || "",
          semestre_curso: res.data.semestre_curso || "",
          creditos_curso: res.data.creditos_curso || "",
          id_tutor: res.data.id_tutor || "",
        };

        reset(cursoData);
      } catch (error) {
        console.error("Error cargando curso", error);
      }
    };
    loadCurso();
  }, [cursoId, reset]);

  // Submit del formulario
  const onSubmit = async (data) => {
    try {
      if (cursoId) {
        await updateCurso(cursoId, data);
        notify.success("¡Curso actualizado con éxito!");
      } else {
        await createCurso(data);
        notify.success("¡Curso creado correctamente!");
      }
      onSuccess();
    } catch (error) {
      const serverErrors = error.response?.data;
      if (serverErrors?.codigo_curso) {
        notify.error("El código del curso ya existe o no es válido.");
      } else if (serverErrors?.id_tutor) {
        notify.error("Hubo un problema con el tutor seleccionado.");
      } else if (serverErrors?.nombre_curso) {
        notify.warning("El nombre del curso es obligatorio.");
      } else {
        notify.error("No se pudo guardar el curso. Revisa los datos.");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg
                   max-h-[90vh] overflow-y-auto space-y-4"
      >
        {/* Botón para cerrar modal */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
          
        >
          ✕
        </button>

        <h1 className="text-2xl font-bold text-center mb-4">
          Formulario de Cursos
        </h1>

        {/* Código */}
        <div>
          <input
            {...register("codigo_curso", { required: "Código requerido" })}
            placeholder="Código del curso"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg
                       focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {errors.codigo_curso && (
            <p className="text-red-500 text-sm mt-1">
              {errors.codigo_curso.message}
            </p>
          )}
        </div>

        {/* Nombre */}
        <div>
          <input
            {...register("nombre_curso", { required: "Nombre requerido" })}
            placeholder="Nombre del curso"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg
                       focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Año */}
        <div>
          <input
            {...register("year_curso", { required: "Año requerido" })}
            type="number"
            placeholder="Año"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg
                       focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Semestre */}
        <div>
          <input
            {...register("semestre_curso", { required: "Semestre requerido" })}
            placeholder="Semestre"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg
                       focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Créditos */}
        <div>
          <input
            {...register("creditos_curso", { required: "Créditos requeridos" })}
            type="number"
            placeholder="Créditos"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg
                       focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Tutor */}
        <div>
          <select
            {...register("id_tutor", { required: "Tutor requerido" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white
                       focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Seleccione un tutor</option>
            {tutors.map((tutor) => (
              <option key={tutor.id_tutor} value={tutor.id_tutor}>
                {tutor.first_name}
              </option>
            ))}
          </select>
        </div>

        {/* Botón */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white
                     font-semibold py-2 rounded-lg transition"
        >
          {isSubmitting ? "Guardando..." : "Guardar"}
        </button>
      </form>
    </div>
  );
}