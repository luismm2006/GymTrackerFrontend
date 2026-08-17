import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addSeriesToExercise, deleteSeries, editSeries, getRoutineById } from "../../../services/routinesService";
import { useAuth } from "../../../context/AuthContext";
import type { RoutineDetails } from "../../../types/routines";
import editImage from "../../../assets/editImage.svg";
import addImage from "../../../assets/addImage.svg";
import deleteImage from "../../../assets/deleteImage.svg";
import AddForm from "./addForm";
import EditForm from "./editForm";
export default function RoutineDetails() {
    const { id } = useParams();
    const { token } = useAuth();
    const [routine, setRoutine] = useState<RoutineDetails | null>(null);
    const [action, setAction] = useState
    <{type: "add" | "edit" | "delete" | null, exerciseId: number | null, seriesId: number | null, initialWeight: number | string | null, initialReps: number | string | null}>
    ({type: null, exerciseId: null, seriesId: null, initialWeight: 0, initialReps: 0});

    const navigate = useNavigate();

    useEffect(() => {
        if (!token) return;
        const fetch = async () => {
            const data = await getRoutineById(token!, Number(id));
            setRoutine(data);
        };
        fetch();
    }, [id, token]);

   

    const handleSaveAdd = async (exerciseId: number, routineId: number, weight: number, reps: number) => {
        await addSeriesToExercise(token!, routineId, exerciseId, Number(weight), Number(reps));
        
        const updated = await getRoutineById(token!, routineId);
        setRoutine(updated);

        setAction({ type: null, exerciseId: null, seriesId: null, initialWeight: null, initialReps: null });
    }

    const handleSaveEdit = async (exerciseId: number, routineId: number, weight: number, reps: number) => {
        await editSeries(token!, routineId, exerciseId, action.seriesId!, Number(weight), Number(reps));

        const updated = await getRoutineById(token!, routineId);
        setRoutine(updated);

        setAction({ type: null, exerciseId: null, seriesId: null, initialWeight: null, initialReps: null });
    }

    const handleSaveDelete = async (exerciseId: number, routineId: number, seriesId: number) => {
        await deleteSeries(token!, routineId, exerciseId, seriesId);

        const updated = await getRoutineById(token!, routineId);
        setRoutine(updated);

        setAction({ type: null, exerciseId: null, seriesId: null, initialWeight: null, initialReps: null });
    };

    const handleCancel = () => {
        setAction({ type: null, exerciseId: null, seriesId: null, initialWeight: null, initialReps: null })
    };


    if (!routine) return <p>Cargando...</p>;

    return (
        <div>
            <h1>{routine.name}</h1>
            <p>{routine.official ? "Rutina oficial" : "Rutina no oficial"}</p>

            <h2>Ejercicios</h2>
            {routine.exercises.length === 0 && <p>No hay ejercicios en esta rutina.</p>}
            <ul>
                {routine.exercises.map((ex) => (
                    <li key={ex.id}>
                        <h3>{ex.exerciseName}</h3>
                        <p>Grupo muscular: {ex.muscleGroup}</p>
                        {ex.series.map((s, index) => (
                            <div key={s.id}>
                                <p>Serie {index + 1}: {s.reps} repeticiones con {s.weight} kg</p>
                                    <div>
                                        <button onClick={() => setAction({ type: "edit", exerciseId: ex.id, seriesId: s.id, initialWeight: s.weight, initialReps: s.reps })}>
                                            <img src={editImage} alt="Editar" style={{ width: "20px", height: "20px" }} />
                                        </button>
                                        <button onClick={() => setAction({ type: "delete", exerciseId: ex.id, seriesId: s.id, initialWeight: null, initialReps: null })}>
                                            <img src={deleteImage} alt="Eliminar" style={{ width: "20px", height: "20px" }} />
                                        </button>
                                    </div>
                                {action.type === "edit" && action.exerciseId === ex.id && action.seriesId === s.id && (
                                    <EditForm
                                        initialWeight={action.initialWeight}
                                        initialReps={action.initialReps}
                                        exerciseId={ex.id}
                                        routineId={routine.id}
                                        onSave={handleSaveEdit}
                                        onCancel={handleCancel}
                                    />
                                )}
                                {action.type === "delete" && action.exerciseId === ex.id && action.seriesId === s.id && (
                                    <div>
                                        <p>¿Estás seguro de que deseas eliminar esta serie?</p>
                                        <button onClick={() => {
                                            handleSaveDelete(ex.id, routine.id, s.id);
                                        }}>
                                            Sí
                                        </button>
                                        <button onClick={handleCancel}>
                                            No
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                            <div>
                                <button onClick={() => setAction({ type: "add", exerciseId: ex.id, seriesId: null, initialWeight: 0, initialReps: 0 })}>
                                    <img src={addImage} alt="Añadir" style={{ width: "20px", height: "20px" }} />
                                </button>
                            </div>


                        {action.type === "add" && action.exerciseId === ex.id && (
                            <AddForm
                                initialWeight={action.initialWeight}
                                initialReps={action.initialReps}
                                exerciseId={ex.id}
                                routineId={routine.id}
                                onSave={handleSaveAdd}
                                onCancel={handleCancel}
                            />
                        )}
                    </li>
                ))}
            </ul>
            <button onClick={()=> navigate("/exercises/" + routine.id)} >Añadir Ejercicio</button>
            <button onClick={() => window.history.back()}>Volver</button>
        </div>
    );
}

