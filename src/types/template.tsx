export  interface Template {
    id: number;
    name: string;
    official: boolean;
}

export  interface TemplateDetails {
    id: number;
    name: string;
    official: boolean;
    createdAt: string;
    exercises: {
        id: number;
        exerciseId: number;
        exerciseName: string;
        muscleGroup: string;
        urlImage: string;
        order: number;
        series:
            {
                id: number;
                weight: number;
                reps: number;
            }[];
    }[];
}
