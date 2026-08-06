import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import type { RegisterInputs } from "../../types/auth";
import { postRegister } from "../../services/authService";

export default function Register() {

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<RegisterInputs>();
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    const onSubmit : SubmitHandler<RegisterInputs> = async (data) => {
        try{
            setError("");
            await postRegister(data);
            navigate("/login");
            reset();
        }
        catch (error) {
             if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Error desconocido");
            }
        }
    }

    const password = watch("password");
    return(
        <div className="auth-container">
            <div>
                <h1>Registrarse</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                <label>Usuario:</label>
                <input
                    type="text"
                    placeholder="Introduce tu usuario"
                    {...register("username", { required: "El usuario es obligatorio" })}
                />
                {errors.username && <p>{errors.username.message}</p>}

                <label>Correo electrónico:</label>
                <input
                    type="email"
                    placeholder="Introduce tu correo"
                    {...register("email", {
                    required: "El email es obligatorio",
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                        message: "El correo debe ser un Gmail válido"
                    }
                    })}
                />
                {errors.email && <p>{errors.email.message}</p>}

                <label>Contraseña:</label>
                <input
                    type="password"
                    placeholder="Introduce tu contraseña"
                    {...register("password", {
                    required: "La contraseña es obligatoria",
                    })}
                />
                {errors.password && <p>{errors.password.message}</p>}

                <label>Repetir contraseña:</label>
                <input
                    type="password"
                    placeholder="Introduce de nuevo tu contraseña"
                    {...register("repeatPassword", {
                    required: "Debes repetir la contraseña",
                    validate: value =>
                        value === password || "Las contraseñas no coinciden"
                    })}
                />
                {errors.repeatPassword && <p>{errors.repeatPassword.message}</p>}

                <Link to={"/login"}>¿Ya tienes una cuenta?</Link>

                {error && <p>{error}</p>}

                <button type="submit">Registrarse</button>
                <Link to={"/home"}>Volver</Link>
                </form>
            </div>
        </div>
    )
}