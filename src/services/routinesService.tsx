
const Url = "http://localhost:8080/api/"


export async function getRoutines(token : string){
    const res = await fetch(Url + "templates", {
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    if(!res.ok){
        const errorText = await res.json();
        throw new Error(errorText.message[0]);
    }
    return res.json()
}

export async function createRoutine(token: string, name: string) {
    const res = await fetch(Url + "createTemplate", {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        },
        body : JSON.stringify({ name })
    })
    if(!res.ok){
        const errorText = await res.json();
        throw new Error(errorText.message[0]);
    }
    return res.json()
}

export async function getRoutineById(token: string, id: number) {
    const res = await fetch(Url + "templates/" + id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    if(!res.ok){
        const errorText = await res.json();
        throw new Error(errorText.message[0]);
    }

    return res.json();
}

export async function addSeriesToExercise(token: string, routineId: number, exerciseId: number, weight: number, reps: number) {
    const res = await fetch(Url + "templates/" + routineId + "/exercises/" + exerciseId + "/series", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({series: [{weight, reps}]})
    });
    if(!res.ok){
        const errorText = await res.json();
        throw new Error(errorText.message[0]);
    }
    return res.json();
}

export async function editSeries(token: string, routineId: number, exerciseId: number, seriesId: number, weight: number, reps: number) {
    const res = await fetch(Url + "templates/" + routineId + "/exercises/" + exerciseId + "/series/" + seriesId, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({weight, reps})
    });
    if(!res.ok){
        const errorText = await res.json();
        throw new Error(errorText.message[0]);
    }
    return res.json();
}

export async function deleteSeries(token: string, routineId: number, exerciseId: number, seriesId: number) {
    const res = await fetch(Url + "templates/" + routineId + "/exercises/" + exerciseId + "/series/" + seriesId, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });
    if(!res.ok){
        const errorText = await res.json();
        throw new Error(errorText.message[0]);
    }
    return res.json();
}

export async function addExercises(token : string, templateId : number, exerciseId : number){
    const res = await fetch(Url + templateId + "/exercises", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({templateId, exerciseId})
    });

    if(!res.ok){
        const errorText = await res.json();
        throw new Error(errorText.message[0]);
    }
    return res.json();
}