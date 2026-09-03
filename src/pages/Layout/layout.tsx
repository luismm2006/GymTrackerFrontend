import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./layout.css";
import gymLogo from "../../assets/GymTracker.png";

const navItems = [
    {
        to: "/home",
        label: "Inicio",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 11L12 4L20 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 10V19C6 19.5523 6.44772 20 7 20H10V15C10 14.4477 10.4477 14 11 14H13C13.5523 14 14 14.4477 14 15V20H17C17.5523 20 18 19.5523 18 19V10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        ),
    },
    {
        to: "/template",
        label: "Plantillas",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.8"/>
                <rect x="13" y="4" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.8"/>
                <rect x="4" y="13" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.8"/>
                <rect x="13" y="13" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.8"/>
            </svg>
        ),
    },
    {
        to: "/profile",
        label: "Perfil",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.8"/>
                <path d="M5 19.5C5.8 16.4 8.6 14.5 12 14.5C15.4 14.5 18.2 16.4 19 19.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
        ),
    },
];

export default function Layout() {
    const { setToken } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        setToken(null);
        navigate("/login");
    };

    return (
        <div className="gt-shell">

            {/* ---------- Sidebar (desktop) ---------- */}
            <aside className="gt-sidebar">
                <div className="gt-sidebar__logo">
                    <img src={gymLogo} alt="GymTracker" className="gt-sidebar__logo-img" />
                    <span className="gt-sidebar__logo-name">GymTracker</span>
                </div>

                <nav className="gt-sidebar__nav">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                `gt-sidebar__link ${isActive ? "gt-sidebar__link--active" : ""}`
                            }
                        >
                            <span className="gt-sidebar__icon">{item.icon}</span>
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <button className="gt-sidebar__logout" onClick={handleLogout}>
                    <span className="gt-sidebar__icon">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 4H6C5.44772 4 5 4.44772 5 5V19C5 19.5523 5.44772 20 6 20H9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M15 16L20 12L15 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9 12H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </span>
                    <span>Cerrar sesión</span>
                </button>
            </aside>

            {/* ---------- Contenido de la página ---------- */}
            <main className="gt-shell__content">
                <Outlet />
            </main>

            {/* ---------- Bottom bar (móvil) ---------- */}
            <nav className="gt-bottom-nav">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            `gt-bottom-nav__link ${isActive ? "gt-bottom-nav__link--active" : ""}`
                        }
                    >
                        <span className="gt-bottom-nav__icon">{item.icon}</span>
                        <span className="gt-bottom-nav__label">{item.label}</span>
                    </NavLink>
                ))}
            </nav>

        </div>
    );
}