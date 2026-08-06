import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRoutineById } from "../../../services/rutinesService";
import { useAuth } from "../../../context/AuthContext";
import type { RoutineDetails } from "../../../types/routines";

export default function RoutineDetails() {
    const { id } = useParams();
    const { token } = useAuth();

    const [routine, setRoutine] = useState<RoutineDetails | null>(null);

    useEffect(() => {
        if (!token) return;
        const fetch = async () => {
            const data = await getRoutineById(token!, Number(id));
            setRoutine(data);
        };
        fetch();
    }, [id, token]);

    if (!routine) return <p>Cargando...</p>;

    return (
        <div>
            <h1>{routine.name}</h1>
            <p>{routine.official ? "Rutina oficial" : "Rutina no oficial"}</p>

            <h2>Ejercicios</h2>
            <ul>
                {routine.exercises.map((ex) => (
                    <li key={ex.id}>
                        <h3>{ex.exerciseName}</h3>
                        <p>Grupo muscular: {ex.muscleGroup}</p>
                        <p>Orden: {ex.order}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
