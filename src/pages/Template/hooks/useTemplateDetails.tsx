import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useEffect, useState } from "react";
import type { TemplateDetails } from "../../../types/template";
import { addSeriesToExercise, deleteSeries, editSeries, getTemplateById } from "../../../services/templateService";
import { deleteExercise } from "../../../services/exercisesService";

export const useTemplateDetails = () => {
    const { id } = useParams();
    const { token } = useAuth();
    const [template, setTemplate] = useState<TemplateDetails | null>(null);
    const [action, setAction] = useState
    <{type: "add" | "edit" | "delete" | null, exerciseId: number | null, seriesId: number | null, initialWeight: number | string | null, initialReps: number | string | null}>
    ({type: null, exerciseId: null, seriesId: null, initialWeight: 0, initialReps: 0});
    const navigate = useNavigate();

    useEffect(() => {
            if (!token) return;
            const fetch = async () => {
                const data = await getTemplateById(token!, Number(id));
                setTemplate(data);
            };
            fetch();
        }, [id, token]);

    const handleSaveAdd = async (exerciseId: number, routineId: number, weight: number, reps: number) => {
        await addSeriesToExercise(token!, routineId, exerciseId, Number(weight), Number(reps));   
        const updated = await getTemplateById(token!, routineId);
        setTemplate(updated);
        setAction({ type: null, exerciseId: null, seriesId: null, initialWeight: null, initialReps: null });
    }
    const handleSaveEdit = async (exerciseId: number, routineId: number, weight: number, reps: number) => {
        await editSeries(token!, routineId, exerciseId, action.seriesId!, Number(weight), Number(reps));
        const updated = await getTemplateById(token!, routineId);
        setTemplate(updated);
        setAction({ type: null, exerciseId: null, seriesId: null, initialWeight: null, initialReps: null });
    }
    const handleSaveDelete = async (exerciseId: number, routineId: number, seriesId: number) => {
        await deleteSeries(token!, routineId, exerciseId, seriesId);
        const updated = await getTemplateById(token!, routineId);
        setTemplate(updated);
        setAction({ type: null, exerciseId: null, seriesId: null, initialWeight: null, initialReps: null });
    };
    const handleCancel = () => {
        setAction({ type: null, exerciseId: null, seriesId: null, initialWeight: null, initialReps: null })
    };
    const handleExerciseDelete = async (exerciseId: number, routineId: number) => {
        await deleteExercise(token!, exerciseId, routineId);
        const updated = await getTemplateById(token!, routineId);
        setTemplate(updated);
        setAction({ type: null, exerciseId: null, seriesId: null, initialWeight: null, initialReps: null });
    }

    return{
        template,
        action,
        navigate,
        setAction,
        handleCancel,
        handleExerciseDelete,
        handleSaveAdd,
        handleSaveDelete,
        handleSaveEdit
    }
}