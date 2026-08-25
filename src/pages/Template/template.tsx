import { Link } from "react-router-dom";
import TemplateItem from "./components/templateItem";
import type { Template } from "../../types/template";
import { useTemplate } from './hooks/useTemplate';

export default function Template() {
    const {filteredTemplate, handleSearchTemplate} = useTemplate();
 
    return(
        <div className="template-container">
            <h1>PLantillas de ejercicios</h1>
            <p>Esta es la página de plantillas.</p>

            <div>
                <Link to="/template/create">Crear nueva plantilla</Link>
                <input type="text" onChange={handleSearchTemplate} placeholder="Buscar plantilla de rutina..." />

                <h2>Lista de plantillas</h2>
                <ul>
                    {filteredTemplate.length > 0 ? (
                        filteredTemplate.map((template) => (
                            <div key={template.id}>
                                <TemplateItem template={template} />
                            </div>
                        ))
                    ) : (
                        <p>No se encontraron plantillas.</p>
                    )}
                </ul>
            </div>
        </div>
    );
}