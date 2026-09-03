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
        <div className="gt-login-auth">

            <div className="gt-login-brand-panel">
                <div className="gt-login-logo-block">
                    <img src={gymLogo} alt="GymTracker logo" className="gt-login-logo-img" />
                </div>
            </div>

            <div className="gt-login-divider" />

            <div className="gt-login-form-panel">
                <div className="gt-login-form-inner">
                    <h1 className="gt-login-title">Inicio de sesión</h1>

                    <form className="gt-login-form" onSubmit={handleSubmit(onSubmit)}>

                        <div className="gt-login-form-group">
                            <label className="gt-login-form-label">Nombre de usuario</label>
                            <input
                                className="gt-login-form-input"
                                type="text"
                                {...register("username", { required: "El usuario es obligatorio" })}
                            />
                            {errors.username && <p className="gt-login-form-error">{errors.username.message}</p>}
                        </div>

                        <div className="gt-login-form-group">
                            <label className="gt-login-form-label">Contraseña</label>
                            <input
                                className="gt-login-form-input"
                                type="password"
                                {...register("password", { required: "La contraseña es obligatoria" })}
                            />
                            {errors.password && <p className="gt-login-form-error">{errors.password.message}</p>}
                        </div>

                        <Link to="/forgot-password" className="gt-login-form-forgot">
                            ¿Has olvidado tu contraseña?
                        </Link>

                        {error && <p className="gt-login-form-error gt-login-form-error-global">{error}</p>}

                        <button className="gt-login-form-submit" type="submit">Iniciar sesión</button>

                        <div className="gt-login-form-register">
                            ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
                        </div>

                    </form>
                </div>
            </div>

        </div>
    );
}