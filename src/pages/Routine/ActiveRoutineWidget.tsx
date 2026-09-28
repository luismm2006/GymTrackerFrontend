import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    formatElapsedTime,
    getActiveRoutine,
    getActiveRoutineEventName,
    type ActiveRoutine,
} from "./activeRoutine";

export default function ActiveRoutineWidget() {
    const [activeRoutine, setActiveRoutineState] = useState<ActiveRoutine | null>(() => getActiveRoutine());
    const [now, setNow] = useState(Date.now());
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const syncActiveRoutine = () => setActiveRoutineState(getActiveRoutine());
        const updateClock = () => setNow(Date.now());
        const activeRoutineEvent = getActiveRoutineEventName();

        window.addEventListener(activeRoutineEvent, syncActiveRoutine);
        window.addEventListener("storage", syncActiveRoutine);
        const intervalId = window.setInterval(updateClock, 1000);

        return () => {
            window.removeEventListener(activeRoutineEvent, syncActiveRoutine);
            window.removeEventListener("storage", syncActiveRoutine);
            window.clearInterval(intervalId);
        };
    }, []);

    if (!activeRoutine || location.pathname === `/routine/start/${activeRoutine.templateId}`) {
        return null;
    }

    return (
        <aside className="gt-active-routine" aria-label="Rutina de entrenamiento activa">
            <span className="gt-active-routine__status">Rutina en curso</span>
            <span className="gt-active-routine__name">{activeRoutine.templateName}</span>
            <span className="gt-active-routine__time" aria-label={`Tiempo transcurrido: ${formatElapsedTime(activeRoutine.startedAt, now)}`}>
                {formatElapsedTime(activeRoutine.startedAt, now)}
            </span>
            <button
                className="gt-active-routine__button"
                type="button"
                onClick={() => navigate(`/routine/start/${activeRoutine.templateId}`)}
            >
                Ir a la rutina
            </button>
        </aside>
    );
}