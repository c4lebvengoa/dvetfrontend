import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Enviamos las credenciales al endpoint de tu backend Spring Boot
            const response = await API.post('/auth/login', { usuario, contrasena });
            
            // Asumiendo que tu backend retorna un objeto con { token: "JWT..." }
            if (response.data && response.data.token) {
                login(response.data.token);
                navigate('/home'); // Redirige a la página de inicio
            } else {
                setError('Respuesta del servidor inválida.');
            }
        } catch (err) {
            console.error(err);
            setError('Credenciales incorrectas. Inténtalo de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 flex items-center justify-center p-4 font-sans">
            <div className="w-full max-w-md bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-white/20">
                
                {/* Logo e Identidad */}
                <div className="text-center mb-8">
                    <span className="text-5xl">🐾</span>
                    <h1 className="text-3xl font-black text-slate-800 mt-3 tracking-tight">D'Pocas Pulgas</h1>
                    <p className="text-sm text-slate-500 mt-1">Sistema de Gestión Veterinaria Integrado</p>
                </div>

                {/* Mensaje de Error */}
                {error && (
                    <div className="bg-rose-50 border border-rose-200 text-rose-600 text-sm p-3.5 rounded-lg mb-5 font-medium animate-shake">
                        ⚠️ {error}
                    </div>
                )}

                {/* Formulario */}
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Nombre de Usuario</label>
                        <input 
                            type="text" 
                            required
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                            placeholder="Ej. Admin123" 
                            className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Contraseña</label>
                        <input 
                            type="password" 
                            required
                            value={contrasena}
                            onChange={(e) => setContrasena(e.target.value)}
                            placeholder="••••••••" 
                            className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition"
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3.5 rounded-xl font-bold shadow-lg shadow-indigo-600/30 transition transform active:scale-98 mt-2 disabled:bg-indigo-400"
                    >
                        {loading ? 'Autenticando...' : 'Iniciar Sesión'}
                    </button>
                </form>
                
                <div className="text-center mt-6">
                    <span className="text-xs text-slate-400">Acceso restringido para personal autorizado.</span>
                </div>
            </div>
        </div>
    );
}