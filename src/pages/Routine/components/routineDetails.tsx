import { useState } from "react";
import type { TemplateDetails } from "../../../types/template";
import AddRoutineForm from "./addRoutineForm";
import { useAuth } from "../../../context/AuthContext";
import deleteImage from "../../../assets/deleteImage.svg";
import { addSeriesToExercise, deleteSeries, getTemplateById } from "../../../services/templateService";
interface RoutineDetails{
    templateRoutine : TemplateDetails;
    setTemplateRoutine : (templateRoutine : TemplateDetails) => void;
}

export function RoutineDetails({templateRoutine, setTemplateRoutine} : RoutineDetails){
    const [notes, setNotes] = useState<string>("");
    const {token} = useAuth();
    const [action, setAction] = useState
    <{type: "add" | "edit" | "delete" | null, exerciseId: number | null, seriesId: number | null, initialWeight: number | string | null, initialReps: number | string | null}>
    ({type: null, exerciseId: null, seriesId: null, initialWeight: 0, initialReps: 0});

    const handleSaveAdd = async (exerciseId: number, routineId: number, weight: number, reps: number) => {
        await addSeriesToExercise(token!, routineId, exerciseId, Number(weight), Number(reps));   
        const updated = await getTemplateById(token!, routineId);
        setTemplateRoutine(updated);
        setAction({ type: null, exerciseId: null, seriesId: null, initialWeight: null, initialReps: null });
    }
    const handleSaveDelete = async (exerciseId: number, routineId: number, seriesId: number) => {
            await deleteSeries(token!, routineId, exerciseId, seriesId);
            const updated = await getTemplateById(token!, routineId);
            setTemplateRoutine(updated);
            setAction({ type: null, exerciseId: null, seriesId: null, initialWeight: null, initialReps: null });
    };
    const handleCancel = async () => {
        setAction({ type: null, exerciseId: null, seriesId: null, initialWeight: null, initialReps: null })
    }
    return(
        <ul className="gt-template-page">
            {templateRoutine.exercises.map((ex) => (
                <li key={ex.id} className="gt-exercise-card">

                    {ex.urlImage && (
                        <img src={ex.urlImage} alt={ex.exerciseName} className="gt-exercise-img" />
                    )}

                    <div className="gt-exercise-card__header">
                        <div className="gt-exercise-card__heading">
                            <h3 className="gt-exercise-card__title">{ex.exerciseName}</h3>
                            <span className="gt-exercise-card__badge">{ex.muscleGroup}</span>
                        </div>
                    </div>
                    <div>
                        <h3>Agrega notas aquí:</h3>
                        <input type="text"/>
                    </div>
                    <div className="gt-series-list">
                        {ex.series.map((s, index) => (
                            <div key={s.id} className="gt-series-row">
                                <p className="gt-series-row__info">
                                    <span className="gt-series-row__label">Serie {index + 1}</span>
                                    <label htmlFor="">Repeticiones: </label>
                                    <input type="text" value={s.reps}/>
                                    <label htmlFor="">Peso: </label>
                                    <input type="text" value={s.weight}/>
                                </p>
                                <button
                                    className="gt-icon-btn gt-icon-btn--danger"
                                    onClick={() => setAction({ type: "delete", exerciseId: ex.id, seriesId: s.id, initialWeight: null, initialReps: null })}
                                >
                                    <img src={deleteImage} alt="Eliminar" className="gt-icon-btn__img" />
                                </button>
                                {action.type === "delete" && action.exerciseId === ex.id && action.seriesId === s.id && (
                                    <div className="gt-confirm-panel">
                                        <p className="gt-confirm-panel__text">¿Estás seguro de que deseas eliminar esta serie?</p>
                                        <div className="gt-confirm-panel__actions">
                                            <button
                                                className="gt-btn gt-btn--danger"
                                                onClick={() => handleSaveDelete(ex.id, templateRoutine.id, s.id)}
                                            >
                                                Sí
                                            </button>
                                            <button className="gt-btn gt-btn--ghost" onClick={handleCancel}>
                                                No
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => setAction({ type: "add", exerciseId: ex.id, seriesId: null, initialWeight: 0, initialReps: 0 })}
                        className="gt-add-series-btn"
                    >
                        <span>Añadir serie</span>
                    </button>
                    {action.type === "add" && action.exerciseId === ex.id && (
                        <div className="gt-inline-form">
                            <AddRoutineForm
                                initialWeight={action.initialWeight}
                                initialReps={action.initialReps}
                                exerciseId={ex.id}
                                templateId={templateRoutine.id}
                                onSave={handleSaveAdd}
                                onCancel={handleCancel}
                            />
                        </div>
                    )}   
                    
                </li>
            ))}
        </ul>
    )
}