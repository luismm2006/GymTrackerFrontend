import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { addExercises } from "../../../services/templateService";
import type { ExercisesResponse } from "../../../types/exercises";

interface Props {
    exercises: ExercisesResponse;
    templateId: number;   
}

export default function ExercisesItem({ exercises, templateId }: Props) {
    const { token } = useAuth();
    const [status, setStatus] = useState<"idle" | "adding" | "added">("idle");
    const [error, setError] = useState<string | null>(null);
    const [imageFailed, setImageFailed] = useState(false);

    const handleAddExercise = async () => {
        if (!token) {
            setError("Inicia sesión para añadir este ejercicio.");
            return;
        }

        setError(null);
        setStatus("adding");
        try {
            await addExercises(token, templateId, exercises.id);
            setStatus("added");
        } catch (addError) {
            setStatus("idle");
            setError(addError instanceof Error ? addError.message : "No se pudo añadir el ejercicio.");
        }
    };

    const buttonLabel = status === "added" ? "Añadido" : status === "adding" ? "Añadiendo..." : "Añadir ejercicio";
    console.log(exercises)
    console.log(exercises.urlImage)

    return (
        <article className="gt-exercise-option">
            <div className="gt-exercise-option__media">
                {exercises.urlImage && !imageFailed ? (
                    <img
                        src={exercises.urlImage}
                        alt={exercises.name}
                        onError={() => setImageFailed(true)}
                    />
                ) : (
                    <div className="gt-exercise-option__placeholder" aria-hidden="true">
                        {exercises.name.slice(0, 2).toLocaleUpperCase()}
                    </div>
                )}
                <span className="gt-exercise-option__tag">{exercises.muscleGroup}</span>
            </div>
            <div className="gt-exercise-option__body">
                <h2 className="gt-exercise-option__name">{exercises.name}</h2>
                {error && <p className="gt-exercise-option__error" role="alert">{error}</p>}
                <button
                    className={`gt-exercise-option__add ${status === "added" ? "gt-exercise-option__add--added" : ""}`}
                    type="button"
                    disabled={status !== "idle"}
                    onClick={() => void handleAddExercise()}
                >
                    {status === "idle" && (
                        <svg viewBox="0 0 20 20" aria-hidden="true">
                            <path d="M10 3.5v13M3.5 10h13" />
                        </svg>
                    )}
                    {buttonLabel}
                </button>
                <span className="gt-exercise-option__status" role="status" aria-live="polite">
                    {status === "added" ? `${exercises.name} añadido a la plantilla.` : status === "adding" ? `Añadiendo ${exercises.name}.` : ""}
                </span>
            </div>
        </article>
    );
}