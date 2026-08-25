const Url = "http://localhost:8080/api/"

export async function getAllExercises(token: string) {
    const res = await fetch(Url + "exercises", 
        {
            method : "GET",
            headers : {
                    "Content-Type" : "application/json",
                    "Authorization" : "Bearer" + token
                }
        }
    )
    if(!res.ok){
        const errorText = await res.json();
        throw new Error(errorText.message[0]);
    }
    return res.json()
}
export async function getAllMuscleGroup(token: string) {
    const res = await fetch(Url + "exercises/types", 
        {
            method : "GET",
            headers : {
                    "Content-Type" : "application/json",
                    "Authorization" : "Bearer " + token
                }
        }
    )
    if(!res.ok){
        const errorText = await res.json();
        throw new Error(errorText.message[0]);
    }
    return res.json()
}

export async function deleteExercise(token: string, exerciseId: number, routineId: number){
    const res = await fetch(Url + "templates/" + routineId + "/exercises/" + exerciseId, 
        {
            method : "DELETE",
            headers : {
                    "Content-Type" : "application/json",
                    "Authorization" : "Bearer " + token
                },
                
        }
    )
    if(!res.ok){
        const errorText = await res.json();
        throw new Error(errorText.message[0]);
    }
    return res.json()
}