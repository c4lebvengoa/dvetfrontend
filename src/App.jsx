import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PersonalCrud from './pages/PersonalCrud';
import NuevaVenta from './pages/NuevaVenta';
import UsuariosCrud from './pages/UsuariosCrud';
import SpaCrud from './pages/SpaCrud';
import MovilidadCrud from './pages/MovilidadCrud';
import InternamientosCrud from './pages/InternamientosCrud';

export default function App() {
    return (
        <BrowserRouter>
            <nav className="bg-slate-900 shadow-xl px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-white font-black text-xl tracking-wider">
                    🐾 D'Pocas Pulgas 
                </div>
                <p className='text-white font-bold'>PECHOCHA MIA</p>
                <ul className="flex flex-wrap justify-center gap-6 text-sm">
                    <li><Link to="/personal" className="text-slate-300 hover:text-white font-semibold transition">Personal</Link></li>
                    <li><Link to="/usuarios" className="text-slate-300 hover:text-white font-semibold transition">Usuarios</Link></li>
                    <li><Link to="/ventas" className="text-slate-300 hover:text-white font-semibold transition">Punto de Venta</Link></li>
                    <li><Link to="/spa" className="text-slate-300 hover:text-white font-semibold transition">Spa</Link></li>
                    <li><Link to="/movilidad" className="text-slate-300 hover:text-white font-semibold transition">Movilidad</Link></li>
                    <li><Link to="/internamientos" className="text-slate-300 hover:text-white font-semibold transition">Internamientos</Link></li>
                </ul>
            </nav>

            <div className="bg-slate-50 min-h-screen">
                <Routes>
                    <Route path="/personal" element={<PersonalCrud />} />
                    <Route path="/usuarios" element={<UsuariosCrud />} />
                    <Route path="/ventas" element={<NuevaVenta />} />
                    <Route path="/spa" element={<SpaCrud />} />
                    <Route path="/movilidad" element={<MovilidadCrud />} />
                    <Route path="/internamientos" element={<InternamientosCrud />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}
