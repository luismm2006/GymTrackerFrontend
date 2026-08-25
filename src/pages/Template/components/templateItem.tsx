import { Link } from "react-router-dom";
import type { Template } from "../../../types/template";

export default function TempalteItem({ template }: { template: Template }) {
    return (
        <li>
            <h3>{template.name}</h3>
            <p>{template.official ? "Rutina oficial" : "Rutina no oficial"}</p>
            <button>Empezar rutina</button>
            <button> <Link to={`/template/${template.id}`}>Ver más</Link></button>
        </li>
    );
}
