import type { TemplateDetails } from "../../../types/template";
import AddRoutineForm from "./addRoutineForm";
import deleteImage from "../../../assets/deleteImage.svg";
import { useRoutineActionsForms } from "../hooks/useRoutineActionsForms";
interface RoutineDetails{
    templateRoutine : TemplateDetails;
    setTemplateRoutine : (templateRoutine : TemplateDetails) => void;
}

export function RoutineDetails({templateRoutine, setTemplateRoutine} : RoutineDetails){
    const {
        action,
        setAction,
        notes,
        handleNoteChange,
        handleSaveAdd,
        handleSaveDelete,
        handleCancel,
    } = useRoutineActionsForms(setTemplateRoutine);
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
                    <div className="gt-routine__notes">
                        <label htmlFor={`routine-notes-${ex.id}`}>Notas de este ejercicio</label>
                        <input
                            id={`routine-notes-${ex.id}`}
                            type="text"
                            value={notes[ex.id] ?? ""}
                            onChange={(event) => handleNoteChange(ex.id, event.target.value)}
                        />
                    </div>
                    <div className="gt-series-list">
                        {ex.series.map((s, index) => (
                            <div key={s.id} className="gt-series-row">
                                <div className="gt-series-row__info">
                                    <span className="gt-series-row__label">Serie {index + 1}</span>
                                    <div className="gt-series-row__field">
                                        <label htmlFor={`routine-${ex.id}-series-${s.id}-reps`}>Repeticiones</label>
                                        <input id={`routine-${ex.id}-series-${s.id}-reps`} type="number" value={s.reps} readOnly />
                                    </div>
                                    <div className="gt-series-row__field">
                                        <label htmlFor={`routine-${ex.id}-series-${s.id}-weight`}>Peso (kg)</label>
                                        <input id={`routine-${ex.id}-series-${s.id}-weight`} type="number" value={s.weight} readOnly />
                                    </div>
                                </div>
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