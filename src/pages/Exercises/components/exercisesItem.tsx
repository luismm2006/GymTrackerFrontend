import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { addExercises } from "../../../services/templateService";
import type { ExercisesResponse } from "../../../types/exercises";

interface Props {
    exercises: ExercisesResponse;
    templateId: number;   
}

export default function ExercisesItem({ exercises, templateId }: Props) {
    const {token} = useAuth();
    const navigate = useNavigate();
    const handleAddExercise = async () => {
        addExercises(token!, templateId, exercises.id);
        alert("Añadido correctamente!!")
        navigate("/template");
    }
    return (
        <div>
            <h3>{exercises.name}</h3>
            <div>
                {exercises.muscleGroup}
            </div>
            <button onClick={handleAddExercise} >Añadir ejercicio</button>
        </div>
    );
}