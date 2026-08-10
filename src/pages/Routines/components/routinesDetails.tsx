import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addSeriesToExercise, getRoutineById } from "../../../services/routinesService";
import { useAuth } from "../../../context/AuthContext";
import type { RoutineDetails } from "../../../types/routines";

export default function RoutineDetails() {
    const { id } = useParams();
    const { token } = useAuth();
    const [routine, setRoutine] = useState<RoutineDetails | null>(null);
    const [addingSeriesFor, setAddingSeriesFor] = useState<number | null>(null);
    const [newSeries, setNewSeries] = useState({ weight: "", reps: "" });

    useEffect(() => {
        if (!token) return;
        const fetch = async () => {
            const data = await getRoutineById(token!, Number(id));
            setRoutine(data);
        };
        fetch();
    }, [id, token]);

    const handleAddSeries = (exerciseId: number) => {
        setAddingSeriesFor(exerciseId);
        setNewSeries({ weight: "", reps: "" });
    }
    const handleSave = (routineId: number, exerciseId: number) => {
        addSeriesToExercise(token!, routineId, exerciseId, Number(newSeries.weight), Number(newSeries.reps));
        setAddingSeriesFor(null);
        setNewSeries({ weight: "", reps: "" });
    }

    const handleCancel = () => {
        setAddingSeriesFor(null);
        setNewSeries({ weight: "", reps: "" });
    };
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
                        {ex.series.map((s, index) => (
                            <div key={s.id}>
                                <p>Serie {index + 1}: {s.reps} repeticiones con {s.weight} kg</p>
                            </div>
                        ))}
                        { addingSeriesFor !== ex.id && (
                            <button onClick={() => {handleAddSeries(ex.id)}}>Añadir serie</button>
                            ) 
                        }

                        { addingSeriesFor === ex.id && (
                            <div>
                                <input
                                    value={newSeries.weight}
                                    onChange={(e) => setNewSeries({ ...newSeries, weight: e.target.value })}
                                    placeholder="Peso"
                                />

                                <input
                                    value={newSeries.reps}
                                    onChange={(e) => setNewSeries({ ...newSeries, reps: e.target.value })}
                                    placeholder="Repeticiones"
                                />

                                <button onClick={() => handleSave(Number(id), ex.id)}>Guardar</button>
                                <button onClick={handleCancel}>Cancelar</button>
                            </div>
                            )
                        }
                    </li>
                ))}
            </ul>
        </div>
    );
}
