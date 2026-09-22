import { useState } from "react";
import type { TemplateDetails } from "../../../types/template";
interface RoutineDetails{
    templateRoutine : TemplateDetails;
}
export function RoutineDetails({templateRoutine} : RoutineDetails){
    const [notes, setNotes] = useState<String>("");
    return(
        <ul className="gt-template-page">
            {templateRoutine.exercises.map((ex) => (
                <li key={ex.id} className="gt-exercise-card">

                    {ex.urlImage && (
                        <img src={ex.urlImage} alt={ex.exerciseName} className="gt-exercise-img" />
                    )}

                    <div className="gt-exercise-card__header">
                        <div className="gt-exercise-card__heading">
                            <h3 className="gt-exercise-card__title">{ex.exerciseName}</h3>
                            <span className="gt-exercise-card__badge">{ex.muscleGroup}</span>
                        </div>
                    </div>
                    <div>
                        <h3>Introduce algún apunte de este ejercicio:</h3>
                        <input type="text"/>
                    </div>
                    <div className="gt-series-list">
                        {ex.series.map((s, index) => (
                            <div key={s.id} className="gt-series-row">
                                <p className="gt-series-row__info">
                                    <span className="gt-series-row__label">Serie {index + 1}</span>
                                    <label htmlFor="">Repeticiones: </label>
                                    <input type="text" value={s.reps}/>
                                    <label htmlFor="">Peso: </label>
                                    <input type="text" value={s.weight}/>
                                </p>
                            </div>
                        ))}
                    </div>

                    <button
                        className="gt-add-series-btn"
                    >
                        <span>Añadir serie</span>
                    </button>

                    
                </li>
            ))}
        </ul>
    )
}