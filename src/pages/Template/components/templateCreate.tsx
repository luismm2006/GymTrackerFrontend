import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { createTemplate } from "../../../services/templateService";
import * as React from "react";

export default function TemplateCreate() {
    const {token} = useAuth();
    const [templateName, setTemplateName] = useState("");


    const handleCreateTemplate = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createTemplate(token!, templateName);
        setTemplateName("");
    }

    return(
        <div>
            <h1>Crear nueva plantilla</h1>
            <form onSubmit={(e) => handleCreateTemplate(e)}>
                <label htmlFor="templateName">Nombre de la plantilla:</label>
                <input onChange={(e : React.ChangeEvent<HTMLInputElement>) => setTemplateName(e.target.value)} type="text" id="templateName" name="templateName" />
                <button type="submit">Crear</button>
                <button type="button">Volver</button>
            </form>
        </div>
    );
}
