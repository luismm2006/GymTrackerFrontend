import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


export default function Home() {
    const { token } = useAuth();
    return(
        <div className="home-container">
            <h1>Bienvenido a la página de inicio</h1>
            <p>Esta es la página principal de la aplicación.</p>
            
            <nav>
                <ul>
                    <li><Link to="/home">Inicio</Link></li>
                    <li><Link to="/template">Plantillas de ejercicios</Link></li>
                    <li><Link to="/profile">Perfil</Link></li>
                    {!token && <li><Link to="/login">Iniciar sesión</Link></li>}
                    {!token && <li><Link to="/register">Registrarse</Link></li>}
                    {token && <li><Link to="/logout">Cerrar sesión</Link></li>}
                </ul>
            </nav>
        
        </div>
        
    );

}