import React, { useState, useEffect } from 'react';
import API from '../api/api';

export default function SpaCrud() {
    const [citas, setCitas] = useState([]);
    const [form, setForm] = useState({
        fechaSpa: '', horaSpa: '', idTrabajador: '', idMascota: '',
        tamano: 'Mediano', tipoServicio: 'Completo', tipoBano: 'Medicinal', tipoCorte: 'Raza',
        estado: 'Pendiente', precioSpa: ''
    });

    const cargarCitas = async () => {
        const res = await API.get('/spa');
        setCitas(res.data);
    };

    useEffect(() => { cargarCitas(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await API.post('/spa', form);
        alert('Servicio de Estética / Spa agendado.');
        cargarCitas();
    };

    return (
        <div className="p-8 bg-slate-50 min-h-screen font-sans">
            <h1 className="text-3xl font-bold text-slate-800 mb-6 border-b-2 border-slate-200 pb-3">Servicios Estéticos y Spa</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md flex flex-col gap-4 border border-slate-100 h-fit">
                    <h2 className="text-xl font-semibold text-slate-700 mb-2">Programar Turno</h2>
                    <div className="grid grid-cols-2 gap-3">
                        <input type="date" value={form.fechaSpa} onChange={e => setForm({...form, fechaSpa: e.target.value})} className="p-2.5 border border-slate-300 rounded-lg text-sm text-slate-600 outline-none" required />
                        <input type="time" value={form.horaSpa} onChange={e => setForm({...form, horaSpa: e.target.value})} className="p-2.5 border border-slate-300 rounded-lg text-sm text-slate-600 outline-none" required />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <input type="number" placeholder="ID Mascota" value={form.idMascota} onChange={e => setForm({...form, idMascota: e.target.value})} className="p-2.5 border border-slate-300 rounded-lg text-sm outline-none" required />
                        <input type="number" placeholder="ID Estilista" value={form.idTrabajador} onChange={e => setForm({...form, idTrabajador: e.target.value})} className="p-2.5 border border-slate-300 rounded-lg text-sm outline-none" required />
                    </div>
                    <select value={form.tipoBano} onChange={e => setForm({...form, tipoBano: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded-lg bg-white text-sm outline-none">
                        <option value="Normal">Baño Básico Estándar</option>
                        <option value="Medicinal">Baño Dermatológico Medicinal</option>
                        <option value="Antipulgas">Baño Antiparasitario Intenso</option>
                    </select>
                    <input type="number" placeholder="Precio Base del Servicio (S/.)" value={form.precioSpa} onChange={e => setForm({...form, precioSpa: e.target.value})} className="p-2.5 border border-slate-300 rounded-lg text-sm outline-none" required />
                    <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 text-white p-3 rounded-lg font-bold shadow-md transition">Agendar Spa</button>
                </form>

                <div className="lg:col-span-2 bg-white rounded-xl shadow-md border p-4">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-100 text-slate-700 font-semibold text-sm border-b">
                                <th className="p-4">Fecha / Hora</th>
                                <th className="p-4">Código Paciente</th>
                                <th className="p-4">Tipo Tratamiento</th>
                                <th className="p-4">Costo</th>
                                <th className="p-4">Estado</th>
                            </tr>
                        </thead>
                        <tbody className="text-slate-600 text-sm divide-y">
                            {citas.map(c => (
                                <tr key={c.idSpa} className="hover:bg-slate-50">
                                    <td className="p-4 font-medium">{`${c.fechaSpa} às ${c.horaSpa}`}</td>
                                    <td className="p-4">Mascota #{c.idMascota}</td>
                                    <td className="p-4">{c.tipoBano}</td>
                                    <td className="p-4 font-semibold text-slate-800">S/. {c.precioSpa}</td>
                                    <td className="p-4"><span className="px-2 py-1 text-xs font-bold bg-amber-50 text-amber-700 rounded-md border border-amber-200">{c.estado}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}