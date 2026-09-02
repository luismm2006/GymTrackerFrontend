import type { TemplateDetails } from "../../../../../types/template";
import "./actionsTemplateDetails.css"
import editImage from "../../../../../assets/editImage.svg"
import addImage from "../../../../../assets/addImage.svg";
import deleteImage from "../../../../../assets/deleteImage.svg";
import EditForm from "../../editForm";
import AddForm from "../../addForm";

interface ActionsTemplateDetailsProps {
    template: TemplateDetails;
    action: {
        type: "add" | "edit" | "delete" | null;
        exerciseId: number | null;
        seriesId: number | null;
        initialWeight: number | string | null;
        initialReps: number | string | null;
    };
    setAction: (action: {
        type: "add" | "edit" | "delete" | null;
        exerciseId: number | null;
        seriesId: number | null;
        initialWeight: number | string | null;
        initialReps: number | string | null;
    }) => void;

    handleCancel: () => void;
    handleExerciseDelete: (exerciseId: number, templateId: number) => void;
    handleSaveAdd: (exerciseId: number, templateId: number, weight: number, reps: number) => void;
    handleSaveDelete: (exerciseId: number, templateId: number, seriesId: number) => void;
    handleSaveEdit: (exerciseId: number, templateId: number, weight: number, reps: number) => void;
}

export default function ActionsTemplateDetails({template, action, setAction, handleCancel, handleExerciseDelete, handleSaveAdd, handleSaveDelete, handleSaveEdit} : ActionsTemplateDetailsProps){
    return(
        <ul className="gt-template-page">
            {template.exercises.map((ex) => (
                <li key={ex.id} className="gt-exercise-card">

                    {ex.urlImage && (
                        <img src={ex.urlImage} alt={ex.exerciseName} className="gt-exercise-img" />
                    )}

                    <div className="gt-exercise-card__header">
                        <div className="gt-exercise-card__heading">
                            <h3 className="gt-exercise-card__title">{ex.exerciseName}</h3>
                            <span className="gt-exercise-card__badge">{ex.muscleGroup}</span>
                        </div>

                        <button
                            className="gt-icon-btn gt-icon-btn--danger"
                            onClick={() => setAction({ type: "delete", exerciseId: ex.id, seriesId: null, initialWeight: null, initialReps: null })}
                        >
                            <img src={deleteImage} alt="Eliminar" className="gt-icon-btn__img" />
                        </button>
                    </div>

                    {action.type === "delete" && action.exerciseId === ex.id && action.seriesId === null && (
                        <div className="gt-confirm-panel">
                            <p className="gt-confirm-panel__text">¿Estás seguro de que deseas eliminar este ejercicio?</p>
                            <div className="gt-confirm-panel__actions">
                                <button
                                    className="gt-btn gt-btn--danger"
                                    onClick={() => handleExerciseDelete(ex.id, template.id)}
                                >
                                    Sí
                                </button>
                                <button className="gt-btn gt-btn--ghost" onClick={handleCancel}>
                                    No
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="gt-series-list">
                        {ex.series.map((s, index) => (
                            <div key={s.id} className="gt-series-row">
                                <p className="gt-series-row__info">
                                    <span className="gt-series-row__label">Serie {index + 1}</span>
                                    <span className="gt-series-row__data">{s.reps} reps · {s.weight} kg</span>
                                </p>

                                <div className="gt-series-row__actions">
                                    <button
                                        className="gt-icon-btn"
                                        onClick={() => setAction({ type: "edit", exerciseId: ex.id, seriesId: s.id, initialWeight: s.weight, initialReps: s.reps })}
                                    >
                                        <img src={editImage} alt="Editar" className="gt-icon-btn__img" />
                                    </button>
                                    <button
                                        className="gt-icon-btn gt-icon-btn--danger"
                                        onClick={() => setAction({ type: "delete", exerciseId: ex.id, seriesId: s.id, initialWeight: null, initialReps: null })}
                                    >
                                        <img src={deleteImage} alt="Eliminar" className="gt-icon-btn__img" />
                                    </button>
                                </div>

                                {action.type === "edit" && action.exerciseId === ex.id && action.seriesId === s.id && (
                                    <div className="gt-inline-form">
                                        <EditForm
                                            initialWeight={action.initialWeight}
                                            initialReps={action.initialReps}
                                            exerciseId={ex.id}
                                            templateId={template.id}
                                            onSave={handleSaveEdit}
                                            onCancel={handleCancel}
                                        />
                                    </div>
                                )}

                                {action.type === "delete" && action.exerciseId === ex.id && action.seriesId === s.id && (
                                    <div className="gt-confirm-panel">
                                        <p className="gt-confirm-panel__text">¿Estás seguro de que deseas eliminar esta serie?</p>
                                        <div className="gt-confirm-panel__actions">
                                            <button
                                                className="gt-btn gt-btn--danger"
                                                onClick={() => handleSaveDelete(ex.id, template.id, s.id)}
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
                        className="gt-add-series-btn"
                        onClick={() => setAction({ type: "add", exerciseId: ex.id, seriesId: null, initialWeight: 0, initialReps: 0 })}
                    >
                        <img src={addImage} alt="Añadir" className="gt-icon-btn__img" />
                        <span>Añadir serie</span>
                    </button>

                    {action.type === "add" && action.exerciseId === ex.id && (
                        <div className="gt-inline-form">
                            <AddForm
                                initialWeight={action.initialWeight}
                                initialReps={action.initialReps}
                                exerciseId={ex.id}
                                templateId={template.id}
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