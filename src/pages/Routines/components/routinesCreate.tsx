import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { createRoutine } from "../../../services/rutinesService";
import * as React from "react";

export default function RoutinesCreate() {
    const {token} = useAuth();
    const [routineName, setRoutineName] = useState("");


    const handleCreateRoutine = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createRoutine(token!, routineName);
        setRoutineName("");
    }

    return(
        <div>
            <h1>Crear nueva rutina</h1>
            <form onSubmit={(e) => handleCreateRoutine(e)}>
                <label htmlFor="routineName">Nombre de la rutina:</label>
                <input onChange={(e : React.ChangeEvent<HTMLInputElement>) => setRoutineName(e.target.value)} type="text" id="routineName" name="routineName" />
                <button type="submit">Crear</button>
                <button type="button">Volver</button>
            </form>
        </div>
    );
}
