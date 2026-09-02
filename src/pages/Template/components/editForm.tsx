import { useState } from "react";
import "./editForm.css";

interface EditFormProps {
  exerciseId: number;
  templateId: number;
  initialWeight: number | string | null;
  initialReps: number | string | null;
  onSave: (exerciseId: number, templateId: number, weight: number, reps: number) => void;
  onCancel: () => void;
}

export default function EditForm({ onSave, onCancel, initialWeight, initialReps, exerciseId, templateId }: EditFormProps) {
    const [weight, setWeight] = useState(Number(initialWeight ?? 0));
    const [reps, setReps] = useState(Number(initialReps ?? 0));

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSave(exerciseId, templateId, weight, reps);
    };

    return (
        <div className="gt-quick-form">
            <form onSubmit={handleSubmit}>
                <div className="gt-quick-form__row">
                    <div className="gt-quick-form__field">
                        <label className="gt-quick-form__label" htmlFor="reps">Repeticiones</label>
                        <input
                            className="gt-quick-form__input"
                            id="reps"
                            type="number"
                            value={reps}
                            onChange={(e) => setReps(Number(e.target.value))}
                            placeholder="0"
                        />
                    </div>

                    <div className="gt-quick-form__field">
                        <label className="gt-quick-form__label" htmlFor="weight">Peso (kg)</label>
                        <input
                            className="gt-quick-form__input"
                            id="weight"
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(Number(e.target.value))}
                            placeholder="0"
                        />
                    </div>
                </div>

                <div className="gt-quick-form__actions">
                    <button className="gt-quick-form__btn gt-quick-form__btn--primary" type="submit">
                        Guardar
                    </button>
                    <button className="gt-quick-form__btn gt-quick-form__btn--ghost" type="button" onClick={onCancel}>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}