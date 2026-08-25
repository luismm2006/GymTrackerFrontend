import type { TemplateDetails } from "../../../../../types/template";
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
        <div>
            {template.exercises.map((ex) => (
                <li key={ex.id}>
                    <h3>{ex.exerciseName}</h3>
                    <button onClick={() => setAction({ type: "delete", exerciseId: ex.id, seriesId: null, initialWeight: null, initialReps: null })}>
                        <img src={deleteImage} alt="Eliminar" style={{ width: "20px", height: "20px" }} />
                    </button>
                    {action.type === "delete" && action.exerciseId === ex.id && action.seriesId === null && (
                        <div>
                            <p>¿Estás seguro de que deseas eliminar este ejercicio?</p>
                                <button onClick={() => {
                                    handleExerciseDelete(ex.id, template.id);
                                }}>
                                    Sí
                                </button>
                                <button onClick={handleCancel}>
                                    No
                                </button>
                        </div>
                    )}
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
                                        templateId={template.id}
                                        onSave={handleSaveEdit}
                                        onCancel={handleCancel}
                                    />
                                )}
                                {action.type === "delete" && action.exerciseId === ex.id && action.seriesId === s.id && (
                                    <div>
                                        <p>¿Estás seguro de que deseas eliminar esta serie?</p>
                                        <button onClick={() => {
                                            handleSaveDelete(ex.id, template.id, s.id);
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
                            templateId={template.id}
                            onSave={handleSaveAdd}
                            onCancel={handleCancel}
                        />
                    )}
                </li>
            ))}
        </div>
    )
}