import { Link } from "react-router-dom";
import TemplateItem from "./components/templateItem";
import type { Template } from "../../types/template";
import { useTemplate } from './hooks/useTemplate';
import "./template.css";

export default function Template() {
    const {filteredTemplate, handleSearchTemplate} = useTemplate();

    return (
        <div className="gt-page">
            <div className="gt-page__inner">

                <header className="gt-hero">
                    <div className="gt-hero__text">
                        <h1 className="gt-hero__title">Plantillas de ejercicios</h1>
                        <p className="gt-hero__subtitle">Elige una plantilla existente o crea la tuya para empezar tu rutina.</p>
                    </div>

                    <div className="gt-hero__actions">
                        <Link to="/template/create" className="gt-btn--primary--link">
                            + Crear nueva plantilla
                        </Link>
                        <Link to="/template/official" className="gt-btn--ghost--link">
                            Plantillas oficiales
                        </Link>
                    </div>
                </header>

                <div className="gt-toolbar">
                    <div className="gt-search-bar">
                        <svg className="gt-search-bar__icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.6"/>
                            <path d="M18 18L14 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                        </svg>
                        <input
                            className="gt-search-bar__input"
                            type="text"
                            onChange={handleSearchTemplate}
                            placeholder="Buscar plantilla de rutina..."
                        />
                    </div>

                    <div className="gt-toolbar__count">
                        {filteredTemplate.length} {filteredTemplate.length === 1 ? "plantilla" : "plantillas"}
                    </div>
                </div>

                {filteredTemplate.length > 0 ? (
                    <ul className="gt-template-grid">
                        {filteredTemplate.map((template) => (
                            <li key={template.id} className="gt-template-grid__item">
                                <TemplateItem template={template} />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="gt-empty-state">
                        <p className="gt-empty-state__title">No se encontraron plantillas</p>
                        <p className="gt-empty-state__text">Prueba con otro nombre o crea una plantilla nueva.</p>
                    </div>
                )}

            </div>
        </div>
    );
}