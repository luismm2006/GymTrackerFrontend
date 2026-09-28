import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getAllExercises, getAllMuscleGroup } from "../../services/exercisesService";
import { getTemplateById } from "../../services/templateService";
import type { ExercisesResponse } from "../../types/exercises";
import ExercisesItem from "./components/exercisesItem";
import "./exercises.css";

export default function ExercisesList() {
    const { token } = useAuth();
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const templateId = Number(id);
    const [exercises, setExercises] = useState<ExercisesResponse[]>([]);
    const [muscleGroupType, setMuscleGroupType] = useState<string[]>([]);
    const [routineName, setRoutineName] = useState<string | null>(null);
    const [search, setSearch] = useState("");
    const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {
        if (!token) {
            setLoadError("Inicia sesión para consultar los ejercicios.");
            setLoading(false);
            return;
        }

        let isCurrent = true;
        const loadExercises = async () => {
            setLoading(true);
            setLoadError(null);
            try {
                const [exerciseData, groupData, templateData] = await Promise.all([
                    getAllExercises(token),
                    getAllMuscleGroup(token),
                    getTemplateById(token, templateId),
                ]);
                if (!isCurrent) return;
                setExercises(exerciseData);
                setMuscleGroupType(groupData);
                setRoutineName(templateData.name);
            } catch (error) {
                if (!isCurrent) return;
                setLoadError(error instanceof Error ? error.message : "No se pudieron cargar los ejercicios.");
            } finally {
                if (isCurrent) setLoading(false);
            }
        };

        void loadExercises();
        return () => {
            isCurrent = false;
        };
    }, [templateId, token, reloadKey]);

    const normalizedSearch = search.trim().toLocaleLowerCase();
    const filteredExercises = exercises.filter((exercise) => {
        const matchesSearch = exercise.name.toLocaleLowerCase().includes(normalizedSearch);
        const matchesGroup = !selectedGroup || exercise.muscleGroup === selectedGroup;
        return matchesSearch && matchesGroup;
    });

    const handleBackToTemplate = () => {
        if (location.state?.fromTemplateDetails === true) {
            navigate(-1);
            return;
        }
        navigate(`/template/${templateId}`, { replace: true });
    };

    return (
        <main className="gt-add-exercises">
            <div className="gt-add-exercises__inner">
                <header className="gt-add-exercises__header">
                    <button className="gt-add-exercises__back" type="button" onClick={handleBackToTemplate}>
                        <span aria-hidden="true">←</span>
                        Volver a plantilla
                    </button>
                    <p className="gt-add-exercises__eyebrow">
                        Constructor de rutina <span aria-hidden="true">/</span> {routineName ?? "Tu rutina"}
                    </p>
                    <div className="gt-add-exercises__title-row">
                        <div>
                            <h1>Añadir ejercicios</h1>
                            <p>Elige movimientos para completar tu próxima sesión.</p>
                        </div>
                        <div className="gt-add-exercises__count" aria-live="polite">
                            <strong>{filteredExercises.length}</strong>
                            <span>{filteredExercises.length === 1 ? "resultado" : "resultados"}</span>
                        </div>
                    </div>
                </header>

                <section className="gt-exercise-browser" aria-label="Buscar y filtrar ejercicios">
                    <label className="gt-exercise-search">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <circle cx="10.8" cy="10.8" r="6.8" />
                            <path d="m16 16 4.3 4.3" />
                        </svg>
                        <span className="gt-visually-hidden">Buscar ejercicios por nombre</span>
                        <input
                            type="search"
                            value={search}
                            onChange={(event) => setSearch(event.currentTarget.value)}
                            placeholder="Buscar por nombre..."
                        />
                    </label>

                    <div className="gt-exercise-filters">
                        <span className="gt-exercise-filters__label">Grupo muscular</span>
                        <div className="gt-exercise-filters__options" role="group" aria-label="Filtrar por grupo muscular">
                            <button
                                type="button"
                                className={`gt-exercise-filter ${selectedGroup === null ? "gt-exercise-filter--active" : ""}`}
                                aria-pressed={selectedGroup === null}
                                onClick={() => setSelectedGroup(null)}
                            >
                                Todos
                            </button>
                            {muscleGroupType.map((group) => (
                                <button
                                    key={group}
                                    type="button"
                                    className={`gt-exercise-filter ${selectedGroup === group ? "gt-exercise-filter--active" : ""}`}
                                    aria-pressed={selectedGroup === group}
                                    onClick={() => setSelectedGroup((current) => current === group ? null : group)}
                                >
                                    {group}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {loading ? (
                    <div className="gt-exercises-state" role="status">Cargando ejercicios...</div>
                ) : loadError ? (
                    <div className="gt-exercises-state gt-exercises-state--error" role="alert">
                        <p>{loadError}</p>
                        <button type="button" onClick={() => setReloadKey((current) => current + 1)}>Reintentar</button>
                    </div>
                ) : filteredExercises.length > 0 ? (
                    <ul className="gt-exercise-grid" aria-label="Resultados de ejercicios">
                        {filteredExercises.map((exercise) => (
                            <li key={exercise.id}>
                                <ExercisesItem exercises={exercise} templateId={templateId} />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="gt-exercises-state">
                        <span className="gt-exercises-state__mark" aria-hidden="true">0</span>
                        <h2>{exercises.length ? "No hay coincidencias" : "No hay ejercicios disponibles"}</h2>
                        <p>{exercises.length ? "Prueba con otro nombre o grupo muscular." : "No se encontraron ejercicios para esta plantilla."}</p>
                    </div>
                )}
            </div>
        </main>
    );
}
