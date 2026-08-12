import { useState } from "react";

interface EditFormProps {
  exerciseId: number;
  routineId: number;
  initialWeight: number | string | null;
  initialReps: number | string | null;
  onSave: (exerciseId: number, routineId: number, weight: number, reps: number) => void;
  onCancel: () => void;
}

export default function EditForm({ onSave, onCancel, initialWeight, initialReps, exerciseId, routineId }: EditFormProps) {
    const [weight, setWeight] = useState(Number(initialWeight ?? 0)) ;
    const [reps, setReps] = useState(Number(initialReps ?? 0)); 
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSave(exerciseId, routineId, weight, reps);
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="reps">Repeticiones:</label>
                <input
                    type="number"
                    value={reps}
                    onChange={(e) => setReps(Number(e.target.value))}
                    placeholder="Repeticiones"
                />
                <label htmlFor="weight">Peso:</label>
                <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    placeholder="Peso"
                />
                <button type="submit">Guardar</button>
                <button onClick={onCancel}>Cancelar</button>
            </form>
        </div>
    );
}