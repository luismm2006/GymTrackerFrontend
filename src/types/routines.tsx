export  interface Routine {
    id: number;
    name: string;
    official: boolean;
}

export  interface RoutineDetails {
    id: number;
    name: string;
    official: boolean;
    createdAt: string;
    exercises: {
        id: number;
        exerciseId: number;
        exerciseName: string;
        muscleGroup: string;
        order: number;
        series:
            {
                id: number;
                weight: number;
                reps: number;
            }[];
    }[];
}
