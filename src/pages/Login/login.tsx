import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import type { LoginInputs } from "../../types/auth";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { postLogin } from "../../services/authService";
import "./login.css";
import gymLogo from "../../assets/GymTracker.png";

export default function Login() {

    const { register, handleSubmit, formState: { errors }, reset } = useForm<LoginInputs>();
    const { setToken } = useAuth();
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
        try {
            setError("");
            const res = await postLogin(data);
            setToken(res.token);
            navigate("/home");
            reset();
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Error desconocido");
            }
        }
    };

    return (
        <div className="gt-auth">

            {/* Panel izquierdo */}
            <div className="gt-auth__form-panel">
                <div className="gt-auth__form-inner">
                    <h1 className="gt-auth__title">Inicio de sesión</h1>

                    <form className="gt-form" onSubmit={handleSubmit(onSubmit)}>

                        <div className="gt-form__group">
                            <label className="gt-form__label">Nombre de usuario</label>
                            <input
                                className="gt-form__input"
                                type="text"
                                {...register("username", { required: "El usuario es obligatorio" })}
                            />
                            {errors.username && <p className="gt-form__error">{errors.username.message}</p>}
                        </div>

                        <div className="gt-form__group">
                            <label className="gt-form__label">Contraseña</label>
                            <input
                                className="gt-form__input"
                                type="password"
                                {...register("password", { required: "La contraseña es obligatoria" })}
                            />
                            {errors.password && <p className="gt-form__error">{errors.password.message}</p>}
                        </div>

                        <Link to="/forgot-password" className="gt-form__forgot-link">
                            ¿Has olvidado tu contraseña?
                        </Link>

                        {error && <p className="gt-form__error gt-form__error--global">{error}</p>}

                        <button className="gt-form__submit" type="submit">Iniciar sesión</button>

                        <div className="gt-form__register-line">
                            ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
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