import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Home =()=>{
    const { logout } = useContext(AuthContext);

    // Lista de módulos asignados según tu esquema operativo
    const modulos = [
        { title: 'Personal', desc: 'Control de asistencias, sueldos, seguros y CVs.', path: '/personal', icon: '👥', color: 'border-l-blue-500 text-blue-600 bg-blue-50/50' },
        { title: 'Usuarios y Cuentas', desc: 'Gestión de credenciales encriptadas y roles.', path: '/usuarios', icon: '🔑', color: 'border-l-purple-500 text-purple-600 bg-purple-50/50' },
        { title: 'Punto de Venta / Boletas', desc: 'Facturación transaccional de productos y servicios.', path: '/ventas', icon: '🛒', color: 'border-l-emerald-500 text-emerald-600 bg-emerald-50/50' },
        { title: 'Spa y Estética', desc: 'Turnos de baños medicinales, antipulgas y cortes.', path: '/spa', icon: '✂️', color: 'border-l-cyan-500 text-cyan-600 bg-cyan-50/50' },
        { title: 'Logística de Movilidad', desc: 'Coordinación vehicular de recojos y entregas.', path: '/movilidad', icon: '🚐', color: 'border-l-orange-500 text-orange-600 bg-orange-50/50' },
        { title: 'Internamientos clínicos', desc: 'Control de pacientes hospitalizados en pabellón.', path: '/internamientos', icon: '🏥', color: 'border-l-rose-500 text-rose-600 bg-rose-50/50' },
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto font-sans">
            
            {/* Encabezado de Bienvenida */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 tracking-tight">¡Bienvenido al Panel de Control!</h1>
                    <p className="text-slate-500 text-sm mt-1">Gestión operativa del Sistema Integrado Veterinario.</p>
                </div>
                <button 
                    onClick={logout} 
                    className="bg-slate-150 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-bold border border-slate-300 shadow-sm transition"
                >
                    🚪 Cerrar Sesión
                </button>
            </div>

            {/* Grid de Accesos Rápidos */}
            <h2 className="text-xl font-bold text-slate-700 mb-4 tracking-tight">Módulos del Sistema</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {modulos.map((mod, index) => (
                    <Link 
                        key={index} 
                        to={mod.path} 
                        className={`block bg-white p-6 rounded-xl shadow-sm border border-slate-100 border-l-4 ${mod.color} hover:shadow-md hover:-translate-y-0.5 transition duration-200`}
                    >
                        <div className="flex justify-between items-start mb-3">
                            <span className="text-2xl">{mod.icon}</span>
                            <span className="text-xs font-bold uppercase tracking-wider bg-white/80 px-2 py-0.5 rounded border">Acceder →</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-800">{mod.title}</h3>
                        <p className="text-slate-500 text-xs mt-1.5 leading-relaxed">{mod.desc}</p>
                    </Link>
                ))}
            </div>

            {/* Footer Informativo de la Clínica */}
            <div className="mt-12 bg-slate-900 text-slate-400 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center text-xs gap-4 shadow-inner">
                <div>
                    <span className="font-bold text-white">Clínica Veterinaria D'Pocas Pulgas S.A.C.</span> | Servidor del Backend Conectado en puerto <span className="text-indigo-400 font-mono">8080</span>
                </div>
                <div className="text-slate-500">
                    Diseño de Arquitectura de Capas Profesionales © 2026
                </div>
            </div>

        </div>
    );
}