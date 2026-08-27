import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import type { RegisterInputs } from "../../types/auth";
import { postRegister } from "../../services/authService";
import "./register.css";
import gymLogo from "../../assets/GymTracker.png";

export default function Register() {

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<RegisterInputs>();
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
        try {
            setError("");
            await postRegister(data);
            navigate("/login");
            reset();
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Error desconocido");
            }
        }
    };

    const password = watch("password");

    return (
        <div className="gt-register-auth">

            {/* LOGO DERECHA / ARRIBA EN MÓVIL */}
            <div className="gt-register-brand-panel">
                <div className="gt-register-logo-block">
                    <img src={gymLogo} alt="GymTracker logo" className="gt-register-logo-img" />
                </div>
            </div>

            {/* DIVISOR */}
            <div className="gt-register-divider" />
            {/* FORMULARIO IZQUIERDA / ARRIBA EN MÓVIL */}
            <div className="gt-register-form-panel">
                <div className="gt-register-form-inner">
                    <h1 className="gt-register-title">Registrarse</h1>

                    <form className="gt-register-form" onSubmit={handleSubmit(onSubmit)}>

                        <div className="gt-register-form-group">
                            <label className="gt-register-form-label">Usuario</label>
                            <input
                                className="gt-register-form-input"
                                type="text"
                                placeholder="Introduce tu usuario"
                                {...register("username", { required: "El usuario es obligatorio" })}
                            />
                            {errors.username && <p className="gt-register-form-error">{errors.username.message}</p>}
                        </div>

                        <div className="gt-register-form-group">
                            <label className="gt-register-form-label">Correo electrónico</label>
                            <input
                                className="gt-register-form-input"
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
                            {errors.email && <p className="gt-register-form-error">{errors.email.message}</p>}
                        </div>

                        <div className="gt-register-form-group">
                            <label className="gt-register-form-label">Contraseña</label>
                            <input
                                className="gt-register-form-input"
                                type="password"
                                placeholder="Introduce tu contraseña"
                                {...register("password", { required: "La contraseña es obligatoria" })}
                            />
                            {errors.password && <p className="gt-register-form-error">{errors.password.message}</p>}
                        </div>

                        <div className="gt-register-form-group">
                            <label className="gt-register-form-label">Repetir contraseña</label>
                            <input
                                className="gt-register-form-input"
                                type="password"
                                placeholder="Introduce de nuevo tu contraseña"
                                {...register("repeatPassword", {
                                    required: "Debes repetir la contraseña",
                                    validate: value =>
                                        value === password || "Las contraseñas no coinciden"
                                })}
                            />
                            {errors.repeatPassword && <p className="gt-register-form-error">{errors.repeatPassword.message}</p>}
                        </div>

                        <Link to="/login" className="gt-register-form-forgot">
                            ¿Ya tienes una cuenta?
                        </Link>

                        {error && <p className="gt-register-form-error gt-register-form-error-global">{error}</p>}

                        <button className="gt-register-form-submit" type="submit">Registrarse</button>

                        <div className="gt-register-form-register">
                            <Link to="/home">Volver</Link>
                        </div>

                    </form>
                </div>
            </div>


        </div>

    );
}