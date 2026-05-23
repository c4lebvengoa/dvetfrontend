import React, { useState, useEffect } from 'react';
import API from '../api/api';

export default function MovilidadCrud() {
    const [servicios, setServicios] = useState([]);
    const [form, setForm] = useState({
        direccionRecojo: '', horaServicio: '', fechaServicio: '', tipoServicio: 'Recojo', obs: '', codPropietario: ''
    });

    const cargarMovilidades = async () => {
        const res = await API.get('/movilidad');
        setServicios(res.data);
    };

    useEffect(() => { cargarMovilidades(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await API.post('/movilidad', form);
        alert('Ruta coordinada con la unidad vehicular móvil.');
        cargarMovilidades();
    };

    return (
        <div className="p-8 bg-slate-50 min-h-screen font-sans">
            <h1 className="text-3xl font-bold text-slate-800 mb-6 border-b-2 border-slate-200 pb-3">Servicio de Movilidad (Recojos / Envíos)</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md flex flex-col gap-4 border border-slate-100 h-fit">
                    <h2 className="text-xl font-semibold text-slate-700 mb-2">Programar Traslado</h2>
                    <input type="text" placeholder="Dirección exacta de recojo" value={form.direccionRecojo} onChange={e => setForm({...form, direccionRecojo: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500" required />
                    <div className="grid grid-cols-2 gap-3">
                        <input type="date" value={form.fechaServicio} onChange={e => setForm({...form, fechaServicio: e.target.value})} className="p-2.5 border border-slate-300 rounded-lg text-sm text-slate-600 outline-none" required />
                        <input type="time" value={form.horaServicio} onChange={e => setForm({...form, horaServicio: e.target.value})} className="p-2.5 border border-slate-300 rounded-lg text-sm text-slate-600 outline-none" required />
                    </div>
                    <input type="number" placeholder="Código de Propietario" value={form.codPropietario} onChange={e => setForm({...form, codPropietario: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded-lg text-sm outline-none" required />
                    <textarea placeholder="Observaciones especiales del domicilio, timbre, temperamento..." value={form.obs} onChange={e => setForm({...form, obs: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded-lg text-sm outline-none h-24 resize-none"></textarea>
                    <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-lg font-bold shadow-md transition">Asignar Unidad vehicular</button>
                </form>

                <div className="lg:col-span-2 bg-white rounded-xl shadow-md border p-4">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-100 text-slate-700 font-semibold text-sm border-b">
                                <th className="p-4">Dirección Destino</th>
                                <th className="p-4">Itinerario Programado</th>
                                <th className="p-4 text-center">Estado Ruta</th>
                            </tr>
                        </thead>
                        <tbody className="text-slate-600 text-sm divide-y">
                            {servicios.map(m => (
                                <tr key={m.idMovilidad} className="hover:bg-slate-50">
                                    <td className="p-4 font-medium text-slate-800">{m.direccionRecojo}</td>
                                    <td className="p-4 text-slate-500">{`${m.fechaServicio} - ${m.horaServicio}`}</td>
                                    <td className="p-4 text-center"><span className="px-3 py-1 text-xs font-black bg-blue-50 text-blue-600 border border-blue-200 rounded-full">{m.estado}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}