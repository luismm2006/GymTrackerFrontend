import { Link } from "react-router-dom";
import type { Routine } from "../../../types/routines";

export default function RoutinesItem({ routine }: { routine: Routine }) {
    return (
        <li>
            <h3>{routine.name}</h3>
            <p>{routine.official ? "Rutina oficial" : "Rutina no oficial"}</p>
            <button>Empezar rutina</button>
            <button> <Link to={`/routines/${routine.id}`}>Ver detalles</Link></button>
        </li>
    );
}
