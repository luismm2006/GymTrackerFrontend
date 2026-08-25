import { useTemplateDetails } from "../../hooks/useTemplateDetails";
import ActionsTemplateDetails from "./components/actionsTemplateDetails";
export default function TemplateDetails() {
    
    const {template, action, navigate, setAction, handleCancel, handleExerciseDelete, handleSaveAdd, handleSaveDelete, handleSaveEdit} = useTemplateDetails();

    if (!template) return <p>Cargando...</p>;

    return (
        <div>
            <h1>{template.name}</h1>
            <p>{template.official ? "Plantilla oficial" : "Plantilla no oficial"}</p>

            <h2>Ejercicios</h2>
            {template.exercises.length === 0 && <p>No hay ejercicios en esta plantilla.</p>}
            <ul>
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
            </ul>
            <button onClick={()=> navigate("/exercises/" + template.id)} >Añadir Ejercicio</button>
            <button onClick={() => window.history.back()}>Volver</button>
        </div>
    );
}

