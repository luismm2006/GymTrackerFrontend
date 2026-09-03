import { Link } from "react-router-dom";
import TemplateItem from "./components/templateItem";
import type { Template } from "../../types/template";
import { useTemplate } from './hooks/useTemplate';
import "./template.css";

export default function Template() {
    const {filteredTemplate, handleSearchTemplate} = useTemplate();

    return (
        <div className="gt-page">

            <div className="gt-page__header">
                <div className="gt-page__heading">
                    <h1 className="gt-page__title">Plantillas de ejercicios</h1>
                    <p className="gt-page__subtitle-text">Elige una plantilla para empezar tu rutina.</p>
                </div>

                <Link to="/template/create" className="gt-btn--primary gt-btn--primary--link">
                    + Crear nueva plantilla
                </Link>
            </div>

            <div className="gt-search-bar">
                <input
                    className="gt-search-bar__input"
                    type="text"
                    onChange={handleSearchTemplate}
                    placeholder="Buscar plantilla de rutina..."
                />
            </div>

            <h2 className="gt-page__subtitle">Lista de plantillas</h2>

            {filteredTemplate.length > 0 ? (
                <ul className="gt-template-grid">
                    {filteredTemplate.map((template) => (
                        <li key={template.id} className="gt-template-grid__item">
                            <TemplateItem template={template} />
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="gt-page__empty">No se encontraron plantillas.</p>
            )}

        </div>
    );
}