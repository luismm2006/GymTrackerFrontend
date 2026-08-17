import { useEffect, useState } from "react";
import { getAllExercises, getAllMuscleGroup } from "../../services/exercisesService";
import { useAuth } from "../../context/AuthContext";
import type { ExercisesResponse } from "../../types/exercises";
import ExercisesItem from "./components/exercisesItem";
import { useParams } from "react-router-dom";

export default function ExercisesList(){
    const {token} = useAuth();
    const {id} = useParams();
    const templateId = Number(id);
    const [exercises, setExercises] = useState<ExercisesResponse[]>([]);
    const [muscleGroupType, setMuscleGroupType] = useState<string[]>([])
    const [filteredExercises, setFilteredExercises] = useState<ExercisesResponse[]>([]);
    useEffect(() => {
        if(!token) return;
        const fetch = async () => {
            const res = await getAllExercises(token!);
            setExercises(res);
            setFilteredExercises(res);
            const resMusc = await getAllMuscleGroup(token!);
            setMuscleGroupType(resMusc);
        }
        fetch();
    }, [token])

    const handleSearchExercises = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = event.target.value.toLowerCase();
        const filtered = exercises.filter((ex) => ex.name.toLowerCase().includes(searchTerm));
        setFilteredExercises(filtered);
    };

    const filterByGroup = (group: string) => {
        const filtered = exercises.filter(ex => ex.muscleGroup === group);
        setFilteredExercises(filtered);
    };

    return(
        <div>
            <h1>Ejercicios</h1>
            <p>Esta es la página de ejercicios.</p>
            <div>
                <input type="text" onChange={handleSearchExercises} placeholder="Buscar ejercicio..." />
                <div>
                    <button onClick={() => setFilteredExercises(exercises)}>
                        Todos
                    </button>
                    {muscleGroupType.length > 0 ? (
                        muscleGroupType.map((mct, index) => (
                            <button key={index} onClick={() => filterByGroup(mct)}>{mct}</button>
                        ))
                    ): (<p>No se encontraron grupos musculares</p>)}
                </div>

                <h2>Lista de ejercicios</h2>
                <ul>
                    {filteredExercises.length > 0 ? (
                        filteredExercises.map((exercises) => (
                            <li key={exercises.id}>
                                <ExercisesItem exercises={exercises} templateId={templateId} />
                            </li>
                        ))
                    ) : (
                        <p>No se encontraron ejercicios.</p>
                    )}
                </ul>
            </div>
        </div>
    );
}