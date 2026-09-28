import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { addSeriesToExercise, deleteSeries, getTemplateById } from "../../../services/templateService";
import type { TemplateDetails } from "../../../types/template";

export type RoutineAction = {
	type: "add" | "edit" | "delete" | null;
	exerciseId: number | null;
	seriesId: number | null;
	initialWeight: number | string | null;
	initialReps: number | string | null;
};

export function useRoutineActionsForms(setRoutine: (routine: TemplateDetails) => void) {
	const { token } = useAuth();
	const [notes, setNotes] = useState<Record<number, string>>({});
	const [action, setAction] = useState<RoutineAction>({
		type: null,
		exerciseId: null,
		seriesId: null,
		initialWeight: 0,
		initialReps: 0,
	});

	const handleNoteChange = (exerciseId: number, value: string) => {
		setNotes((current) => ({ ...current, [exerciseId]: value }));
	};

	const handleSaveAdd = async (exerciseId: number, routineId: number, weight: number, reps: number) => {
		await addSeriesToExercise(token!, routineId, exerciseId, Number(weight), Number(reps));
		const updated = await getTemplateById(token!, routineId);
		setRoutine(updated);
		handleCancel();
	};

	const handleSaveDelete = async (exerciseId: number, routineId: number, seriesId: number) => {
		await deleteSeries(token!, routineId, exerciseId, seriesId);
		const updated = await getTemplateById(token!, routineId);
		setRoutine(updated);
		handleCancel();
	};

	const handleCancel = () => {
		setAction({
			type: null,
			exerciseId: null,
			seriesId: null,
			initialWeight: null,
			initialReps: null,
		});
	};

	return {
		action,
		setAction,
		notes,
		handleNoteChange,
		handleSaveAdd,
		handleSaveDelete,
		handleCancel,
	};
}
