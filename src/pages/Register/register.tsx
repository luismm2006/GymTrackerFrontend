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
        <div className="gt-auth">

            {/* Panel izquierdo */}
            <div className="gt-auth__form-panel">
                <div className="gt-auth__form-inner">
                    <h1 className="gt-auth__title">Registrarse</h1>

                    <form className="gt-form" onSubmit={handleSubmit(onSubmit)}>

                        <div className="gt-form__group">
                            <label className="gt-form__label">Usuario</label>
                            <input
                                className="gt-form__input"
                                type="text"
                                placeholder="Introduce tu usuario"
                                {...register("username", { required: "El usuario es obligatorio" })}
                            />
                            {errors.username && <p className="gt-form__error">{errors.username.message}</p>}
                        </div>

                        <div className="gt-form__group">
                            <label className="gt-form__label">Correo electrónico</label>
                            <input
                                className="gt-form__input"
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
                            {errors.email && <p className="gt-form__error">{errors.email.message}</p>}
                        </div>

                        <div className="gt-form__group">
                            <label className="gt-form__label">Contraseña</label>
                            <input
                                className="gt-form__input"
                                type="password"
                                placeholder="Introduce tu contraseña"
                                {...register("password", {
                                    required: "La contraseña es obligatoria",
                                })}
                            />
                            {errors.password && <p className="gt-form__error">{errors.password.message}</p>}
                        </div>

                        <div className="gt-form__group">
                            <label className="gt-form__label">Repetir contraseña</label>
                            <input
                                className="gt-form__input"
                                type="password"
                                placeholder="Introduce de nuevo tu contraseña"
                                {...register("repeatPassword", {
                                    required: "Debes repetir la contraseña",
                                    validate: value =>
                                        value === password || "Las contraseñas no coinciden"
                                })}
                            />
                            {errors.repeatPassword && <p className="gt-form__error">{errors.repeatPassword.message}</p>}
                        </div>

                        <Link to="/login" className="gt-form__forgot-link">
                            ¿Ya tienes una cuenta?
                        </Link>

                        {error && <p className="gt-form__error gt-form__error--global">{error}</p>}

                        <button className="gt-form__submit" type="submit">Registrarse</button>

                        <div className="gt-form__register-line">
                            <Link to="/home">Volver</Link>
                        </div>

                    </form>
                </div>
            </div>

            {/* Divisor */}
            <div className="gt-auth__divider" />

            {/* Panel derecho */}
            <div className="gt-auth__brand-panel">
                <div className="gt-brand__logo-block">
                    <img src={gymLogo} alt="GymTracker logo" className="gt-brand__logo-img" />
                    <span className="gt-brand__logo-name">GymTracker</span>
                </div>
            </div>

        </div>
    );
}