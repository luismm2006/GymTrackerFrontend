import { useEffect, useRef, useState } from 'react';
import { getTemplateById } from '../../services/templateService';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import type { TemplateDetails } from '../../types/template';
import Gtloader from '../../components/gtloader';
import { RoutineDetails } from './components/routineDetails';
import { clearActiveRoutine, formatElapsedTime, getActiveRoutine, setActiveRoutine } from './activeRoutine';
import './routine.css';

export default function Routine() {
    const { token } = useAuth();
    const { templateId } = useParams();
    const navigate = useNavigate();
    const [templateRoutine, setTemplateRoutine] = useState<TemplateDetails | null>(null);
    const [now, setNow] = useState(Date.now());
    const [error, setError] = useState<string | null>(null);
    const enteredAtRef = useRef(Date.now());

    useEffect(() => {
        let isCurrent = true;
        const loadTemplate = async () => {
            const id = Number(templateId);
            if (!token || !templateId || !Number.isInteger(id) || id <= 0) {
                setError('No se pudo identificar la plantilla de rutina.');
                return;
            }

            const activeRoutine = getActiveRoutine();
            if (activeRoutine && activeRoutine.templateId !== id) {
                navigate(`/routine/start/${activeRoutine.templateId}`, { replace: true });
                return;
            }

            try {
                const data = await getTemplateById(token, id);
                if (!isCurrent) return;

                setTemplateRoutine(data);
                setActiveRoutine({
                    templateId: id,
                    templateName: data.name,
                    startedAt: activeRoutine?.startedAt ?? enteredAtRef.current,
                });
            } catch {
                if (isCurrent) setError('No se pudo cargar la rutina. Inténtalo de nuevo.');
            }
        };

        void loadTemplate();
        return () => {
            isCurrent = false;
        };
    }, [navigate, templateId, token]);

    useEffect(() => {
        const intervalId = window.setInterval(() => setNow(Date.now()), 1000);
        return () => window.clearInterval(intervalId);
    }, []);

    const activeRoutine = getActiveRoutine();

    if (!templateRoutine) {
        return (
            <section className="gt-routine gt-routine--loading" aria-live="polite">
                {error ? <p className="gt-routine__error" role="alert">{error}</p> : <Gtloader />}
            </section>
        );
    }

    const handleFinish = () => {
        clearActiveRoutine();
        navigate('/home', { replace: true });
    };

    return (
        <section className="gt-routine">
            <header className="gt-routine__header">
                <button className="gt-back-btn" type="button" onClick={() => navigate(-1)}>
                    <span aria-hidden="true">←</span> Volver
                </button>

                <div className="gt-routine__overview">
                    <div className="gt-routine__heading">
                        <p className="gt-routine__eyebrow">Entrenamiento en curso</p>
                        <h1 className="gt-page__title">{templateRoutine.name}</h1>
                        <span className={`gt-page__badge ${templateRoutine.official ? 'gt-page__badge--official' : ''}`}>
                            {templateRoutine.official ? 'Plantilla oficial' : 'Plantilla no oficial'}
                        </span>
                    </div>
                    <div className="gt-routine__clock">
                        <span className="gt-routine__clock-label">Tiempo transcurrido</span>
                        <output className="gt-routine__time" aria-live="off">
                            {formatElapsedTime(activeRoutine?.startedAt ?? enteredAtRef.current, now)}
                        </output>
                    </div>
                </div>
            </header>

            <RoutineDetails
                templateRoutine={templateRoutine}
                setTemplateRoutine={setTemplateRoutine}
            />

            <div className="gt-routine__footer">
                <button className="gt-routine__finish" type="button" onClick={handleFinish}>
                    Finalizar entrenamiento
                </button>
            </div>
        </section>
    );
}
