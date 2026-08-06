import type { LoginInputs, RegisterInputs } from "../types/auth";

const Url = "http://localhost:8080/api/"

export async function postRegister(userRegister : RegisterInputs){
    const res = await fetch(Url + "auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userRegister)
    })
    if(!res.ok){
        const errorText = await res.json();
        throw new Error(errorText.message[0]);
    }
    return res.json()
}


export async function postLogin(userLogin : LoginInputs){
    const res = await fetch(Url + "auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userLogin)
    })
    if(!res.ok){
        const errorText = await res.json();
        throw new Error(errorText.message[0]);
    }
    
    return res.json()
}