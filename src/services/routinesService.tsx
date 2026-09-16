const Url = "http://localhost:8080/api/"

export async function postStartRoutine(token : string, templateId : number, userId : number){
    const res = await fetch(Url + "routine/" + templateId , {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({templateId, userId})
    });

    if(!res.ok){
        const errorText = await res.json();
        throw new Error(errorText.message[0]);
    }
    return res.json();
}