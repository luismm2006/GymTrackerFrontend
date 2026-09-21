import { useEffect, useRef, useState } from 'react';
import { getTemplateById } from '../../services/templateService';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import type { TemplateDetails } from '../../types/template';
import Gtloader from '../../components/gtloader';
export default function Routine() {
    const {token} = useAuth();
    const {templateId} = useParams();
    const [templateRoutine, setTemplateRoutine] = useState<TemplateDetails | null> (null);
    const [seconds, setSeconds] = useState(0);
    const intervalRef = useRef<number | null>(null);

    useEffect (() => {
        const loadTemplate = async() => {
            const data = await getTemplateById(token!, Number(templateId!));
            setTemplateRoutine(data);
        }
        loadTemplate();
    }, []);
    
    
    useEffect(() => {
        const startTime = Date.now();

        localStorage.setItem(
            "routineStartTime",
            startTime.toString()
        );

        intervalRef.current = window.setInterval(() => {
            const elapsedTime = Math.floor(
                (Date.now() - startTime) / 1000
            );

            setSeconds(elapsedTime);
        }, 1000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);


    const formatTime = (totalSeconds: number) => {
        const minutes = Math.floor(totalSeconds / 60);
       const seconds = totalSeconds % 60;

        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };
    if (!templateRoutine) {
        return (
            <div className="gt-page gt-page--loading">
                <div className="gt-page__loading-text"><Gtloader/></div>
            </div>
        );
    }
    const handleClick = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    }
    return(
        <div>
            <h1>Empezando rutina</h1>
            <h1>{formatTime(seconds)}</h1>
            <h2>{templateRoutine!.name}</h2>
            <div className="gt-page__header">
                <button className="gt-back-btn" onClick={() => window.history.back()}>
                    ← Volver
                </button>

                <div className="gt-page__heading">
                    <h1 className="gt-page__title">{templateRoutine!.name}</h1>
                    <span className={`gt-page__badge ${templateRoutine!.official ? "gt-page__badge--official" : ""}`}>
                        {templateRoutine!.official ? "Plantilla oficial" : "Plantilla no oficial"}
                    </span>
                </div>
            </div>
            
            
            <button onClick={handleClick}>Finalizar entrenamiento</button>
        </div>

    );
}
