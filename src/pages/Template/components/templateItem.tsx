import { Link } from "react-router-dom";
import type { Template } from "../../../types/template";
import "./templateItem.css";

export default function TemplateItem({ template }: { template: Template }) {
    return (
        <div className="gt-template-card">
            <div className="gt-template-card__heading">
                <h3 className="gt-template-card__title">{template.name}</h3>
                <span className={`gt-template-card__badge ${template.official ? "gt-template-card__badge--official" : ""}`}>
                    {template.official ? "Rutina oficial" : "Rutina no oficial"}
                </span>
            </div>

            <div className="gt-template-card__actions">
                <button className="gt-template-card__btn gt-template-card__btn--primary">
                    Empezar rutina
                </button>
                <Link to={`/template/${template.id}`} className="gt-template-card__btn gt-template-card__btn--ghost">
                    Ver más
                </Link>
            </div>
        </div>
    );
}