import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';
import {Navbar} from './components/Navbar';

// Páginas
import Login from './pages/Login';
import {Home} from './pages/Home';
import PersonalCrud from './pages/PersonalCrud';
import NuevaVenta from './pages/NuevaVenta';
import UsuariosCrud from './pages/UsuariosCrud';
import SpaCrud from './pages/SpaCrud';
import MovilidadCrud from './pages/MovilidadCrud';
import InternamientosCrud from './pages/InternamientosCrud';

// Ruta Protegida Interna
const ProtectedLayout = ({ children }) => {
    const { token } = useContext(AuthContext);
    
    // Si no hay token, lo expulsa directamente al Login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Si hay sesión activa, muestra la barra de navegación y el contenido de la página
    return (
        <>
            <Navbar />
            <div className="bg-slate-50 min-h-screen">
                {children}
            </div>
        </>
    );
};

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Ruta Pública */}
                    <Route path="/login" element={<Login />} />

                    {/* Rutas Privadas Protegidas por Token */}
                    <Route path="/home" element={<ProtectedLayout><Home /></ProtectedLayout>} />
                    <Route path="/personal" element={<ProtectedLayout><PersonalCrud /></ProtectedLayout>} />
                    <Route path="/usuarios" element={<ProtectedLayout><UsuariosCrud /></ProtectedLayout>} />
                    <Route path="/ventas" element={<ProtectedLayout><NuevaVenta /></ProtectedLayout>} />
                    <Route path="/spa" element={<ProtectedLayout><SpaCrud /></ProtectedLayout>} />
                    <Route path="/movilidad" element={<ProtectedLayout><MovilidadCrud /></ProtectedLayout>} />
                    <Route path="/internamientos" element={<ProtectedLayout><InternamientosCrud /></ProtectedLayout>} />

                    {/* Redirección por defecto */}
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}