import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import type { LoginInputs } from "../../types/auth";
import{ useForm, type SubmitHandler } from "react-hook-form"
import { Link } from "react-router-dom";
import { postLogin } from "../../services/authService";
import "./login.css";

export default function Login() {

    const { register, handleSubmit, formState: { errors } } = useForm<LoginInputs>();
    const { setToken } = useAuth();
    const [error, setError] = useState<string>("");

    const onSubmit : SubmitHandler<LoginInputs> = async (data) => {
        try{
            setError("");
            const res = await postLogin(data);
            setToken(res.token);

        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Error desconocido");
            }
        }
    }

    return(
        <div className="auth-container">
            <h1>Inicio de sesión</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
            <label>Usuario:</label>
            <input type="text" placeholder="Introduce tu usuario" {...register("username", { required: "El usuario es obligatorio" })}/>
            {errors.username && <p>{errors.username.message}</p>}

            <label>Contraseña:</label>
            <input type="password" placeholder="Introduce tu contraseña" {...register("password", { required: "La contraseña es obligatoria" })}/>
            {errors.password && <p>{errors.password.message}</p>}

            <Link to={"/register"}>¿No tienes cuenta?</Link>
            {error && <p>{error}</p>}

            <button type="submit" >Iniciar Sesión</button>
            <Link to={"/home"} >Volver</Link>
            </form>
        </div>
    );


}