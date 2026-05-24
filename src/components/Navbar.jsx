import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Navbar=()=>{
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    // Módulos del sistema alineados con tus rutas
    const links = [
        { name: 'Inicio', path: '/home', icon: '🏠' },
        { name: 'Personal', path: '/personal', icon: '👥' },
        { name: 'Usuarios', path: '/usuarios', icon: '🔑' },
        { name: 'Punto de Venta', path: '/ventas', icon: '🛒' },
        { name: 'Spa', path: '/spa', icon: '✂️' },
        { name: 'Movilidad', path: '/movilidad', icon: '🚐' },
        { name: 'Internamientos', path: '/internamientos', icon: '🏥' },
    ];

    const handleLogout = () => {
        logout();
        navigate('/login'); // Redirecciona al login inmediatamente al salir
    };

    return (
        <nav className="bg-slate-900 shadow-xl border-b border-slate-800 px-6 py-4 flex flex-col lg:flex-row justify-between items-center gap-4 sticky top-0 z-50">
            
            {/* Logo del Sistema */}
            <div className="flex items-center gap-3">
                <span className="text-2xl animate-pulse">🐾</span>
                <div className="flex flex-col">
                    <span className="text-white font-black text-lg tracking-wider bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                        D'Pocas Pulgas
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                        Sistema Veterinario ERP
                    </span>
                </div>
            </div>

            {/* Enlaces de Navegación Orientados a Módulos */}
            <ul className="flex flex-wrap justify-center gap-1.5 md:gap-2 text-xs md:text-sm">
                {links.map((link) => {
                    const isActive = location.pathname === link.path;
                    return (
                        <li key={link.path}>
                            <Link
                                to={link.path}
                                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold transition duration-200 ${
                                    isActive
                                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-500'
                                        : 'text-slate-300 hover:bg-slate-800 hover:text-white border border-transparent'
                                }`}
                            >
                                <span>{link.icon}</span>
                                <span>{link.name}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>

            {/* Botón de Salida Segura */}
            <div className="flex items-center gap-4">
                <div className="hidden xl:flex flex-col text-right">
                    <span className="text-xs font-bold text-slate-300">Sesión Activa</span>
                    <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1 justify-end">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping"></span> En Línea
                    </span>
                </div>
                
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-slate-800/80 hover:bg-rose-950/40 hover:text-rose-400 hover:border-rose-900/50 text-slate-300 px-4 py-2 rounded-xl text-xs font-bold border border-slate-700/80 transition duration-150 group"
                    title="Cerrar sesión de forma segura"
                >
                    <span className="transition-transform group-hover:translate-x-0.5">🚪</span>
                    <span>Salir</span>
                </button>
            </div>

        </nav>
    );
}