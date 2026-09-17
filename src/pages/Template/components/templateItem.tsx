import { Link, useNavigate } from "react-router-dom";
import type { Template } from "../../../types/template";
import "./templateItem.css";
import { postStartRoutine } from "../../../services/routinesService";
import { useAuth } from "../../../context/AuthContext";

export default function TemplateItem({ template }: { template: Template }) {
    const {token, userId} = useAuth();
    const navigate = useNavigate();
    const handleClick = () => {
        postStartRoutine(token!, template.id, userId!);
        navigate("/routine/start")
    }
    
    return (
        <div className="gt-template-card">
            <div className="gt-template-card__heading">
                <h3 className="gt-template-card__title">{template.name}</h3>
                <span className={`gt-template-card__badge ${template.official ? "gt-template-card__badge--official" : ""}`}>
                    {template.official ? "Rutina oficial" : "Rutina no oficial"}
                </span>
            </div>

            <div className="gt-template-card__actions">
                <button onClick={() => handleClick()} className="gt-template-card__btn gt-template-card__btn--primary">
                    Empezar rutina
                </button>
                <Link to={`/template/${template.id}`} className="gt-template-card__btn gt-template-card__btn--ghost">
                    Ver más
                </Link>
            </div>
        </div>
    );
}