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
            <div className="auth-wrapper">
                {/* Panel izquierdo */}
                <div className="auth-left">
                    <h1>Inicio de sesión</h1>

                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="field-group">
                            <label>Nombre de usuario</label>
                            <input
                                type="text"
                                {...register("username", { required: "El usuario es obligatorio" })}
                            />
                            {errors.username && <p className="field-error">{errors.username.message}</p>}
                        </div>

                        <div className="field-group">
                            <label>Contraseña</label>
                            <input
                                type="password"
                                {...register("password", { required: "La contraseña es obligatoria" })}
                            />
                            {errors.password && <p className="field-error">{errors.password.message}</p>}
                        </div>

                        <Link to="/forgot-password" className="forgot-link">
                            ¿Has olvidado tu contraseña?
                        </Link>

                        {error && <p className="field-error">{error}</p>}

                        <button type="submit">Iniciar sesión</button>

                        <div className="register-line">
                            ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
                        </div>

                    </form>
                </div>

                {/* Panel derecho */}
                <div className="auth-right">

                    {/* Barras superiores */}
                    <div className="slash-top">
                        <span className="slash slash-1"></span>
                        <span className="slash slash-2"></span>
                    </div>

                    {/* Logo */}
                    <div className="auth-logo-block">
                        <img src={gymLogo} alt="GymTracker logo" className="auth-logo-img" />
                        <span className="auth-logo-name">GymTracker</span>
                    </div>

                    {/* Barras inferiores */}
                    <div className="slash-bottom">
                        <span className="slash slash-3"></span>
                        <span className="slash slash-4"></span>
                    </div>

                </div>
            </div>

    );
}