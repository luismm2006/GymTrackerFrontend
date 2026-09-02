import { useTemplateDetails } from "../../hooks/useTemplateDetails";
import ActionsTemplateDetails from "./components/actionsTemplateDetails";
import "./templateDetails.css"

export default function TemplateDetails() {

    const {template, action, navigate, setAction, handleCancel, handleExerciseDelete, handleSaveAdd, handleSaveDelete, handleSaveEdit} = useTemplateDetails();

    if (!template) {
        return (
            <div className="gt-page gt-page--loading">
                <p className="gt-page__loading-text">Cargando...</p>
            </div>
        );
    }

    return (
        <div className="gt-page">
            <div className="gt-page__header">
                <button className="gt-back-btn" onClick={() => window.history.back()}>
                    ← Volver
                </button>

                <div className="gt-page__heading">
                    <h1 className="gt-page__title">{template.name}</h1>
                    <span className={`gt-page__badge ${template.official ? "gt-page__badge--official" : ""}`}>
                        {template.official ? "Plantilla oficial" : "Plantilla no oficial"}
                    </span>
                </div>
            </div>

            <div className="gt-page__section-header">
                <h2 className="gt-page__subtitle">Ejercicios</h2>
                <button
                    className="gt-btn gt-btn--primary"
                    onClick={() => navigate("/exercises/" + template.id)}
                >
                    + Añadir ejercicio
                </button>
            </div>

            {template.exercises.length === 0 ? (
                <p className="gt-page__empty">No hay ejercicios en esta plantilla.</p>
            ) : (
                <ActionsTemplateDetails
                    template={template}
                    action={action}
                    setAction={setAction}
                    handleCancel={handleCancel}
                    handleExerciseDelete={handleExerciseDelete}
                    handleSaveAdd={handleSaveAdd}
                    handleSaveDelete={handleSaveDelete}
                    handleSaveEdit={handleSaveEdit}
                />
            )}
        </div>
    );
}