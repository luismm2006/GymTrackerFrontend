import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import type Routine from "../../types/routines";
import { getRoutines } from "../../services/rutinesService";
import RoutinesItem from "./components/routinesItem";

export default function Routines() {
    const { token } = useAuth();
    const [routines, setRoutines] = useState<Routine[]>([]);
    const [filteredRoutines, setFilteredRoutines] = useState<Routine[]>([]);

    useEffect(() => {
        const fetch = async () => {
            const routinesData = await getRoutines(token!);
            setRoutines(routinesData);
            setFilteredRoutines(routinesData);
        }
        fetch();
    }, [token]);


    const handleSearchRoutine = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = event.target.value.toLowerCase();
        const filtered = routines.filter((r) => r.name.toLowerCase().includes(searchTerm));
        setFilteredRoutines(filtered);
    };

    return(
        <div className="routines-container">
            <h1>Rutinas</h1>
            <p>Esta es la página de rutinas.</p>

            <div>
                <Link to="/routines/create">Crear nueva rutina</Link>
                <input type="text" onChange={handleSearchRoutine} placeholder="Buscar rutina..." />

                <h2>Lista de rutinas</h2>
                <ul>
                    {filteredRoutines.length > 0 ? (
                        filteredRoutines.map((routine) => (
                            <div key={routine.id}>
                                <RoutinesItem routine={routine} />
                            </div>
                        ))
                    ) : (
                        <p>No se encontraron rutinas.</p>
                    )}
                </ul>
            </div>
        </div>
    );
}