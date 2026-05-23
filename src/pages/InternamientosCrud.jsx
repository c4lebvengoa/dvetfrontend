import React, { useState, useEffect } from 'react';
import API from '../api/api';

export default function InternamientosCrud() {
    const [internados, setInternados] = useState([]);
    const [form, setForm] = useState({
        idHistoria: '', motivo: '', sintomas: '', fechaIngreso: '', horaIngreso: ''
    });

    const cargarHospitalizados = async () => {
        const res = await API.get('/internamientos');
        setInternados(res.data);
    };

    useEffect(() => { cargarHospitalizados(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await API.post('/internamientos', form);
        alert('Ingreso médico a hospitalización realizado.');
        cargarHospitalizados();
    };

    return (
        <div className="p-8 bg-slate-50 min-h-screen font-sans">
            <h1 className="text-3xl font-bold text-slate-800 mb-6 border-b-2 border-slate-200 pb-3">Pabellón de Internamientos y Hospitalización</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md flex flex-col gap-4 border border-slate-100 h-fit">
                    <h2 className="text-xl font-semibold text-slate-700 mb-2">Ingresar Ficha Médica</h2>
                    <input type="number" placeholder="N° de Historia Clínica (ID)" value={form.idHistoria} onChange={e => setForm({...form, idHistoria: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-rose-500" required />
                    <input type="text" placeholder="Motivo clínico de ingreso" value={form.motivo} onChange={e => setForm({...form, motivo: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded-lg text-sm outline-none" required />
                    <input type="text" placeholder="Sintomatología aguda" value={form.sintomas} onChange={e => setForm({...form, sintomas: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded-lg text-sm outline-none" required />
                    <div className="grid grid-cols-2 gap-3">
                        <input type="date" value={form.fechaIngreso} onChange={e => setForm({...form, fechaIngreso: e.target.value})} className="p-2.5 border border-slate-300 rounded-lg text-sm text-slate-600 outline-none" required />
                        <input type="time" value={form.horaIngreso} onChange={e => setForm({...form, horaIngreso: e.target.value})} className="p-2.5 border border-slate-300 rounded-lg text-sm text-slate-600 outline-none" required />
                    </div>
                    <button type="submit" className="w-full bg-rose-600 hover:bg-rose-700 text-white p-3 rounded-lg font-bold shadow-md transition">Confirmar Hospitalización</button>
                </form>

                <div className="lg:col-span-2 bg-white rounded-xl shadow-md border p-4">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-100 text-slate-700 font-semibold text-sm border-b">
                                <th className="p-4">N° Ficha Clínica</th>
                                <th className="p-4">Motivo Diagnóstico</th>
                                <th className="p-4">Ingreso Registrado</th>
                                <th className="p-4 text-center">Alta Médica</th>
                            </tr>
                        </thead>
                        <tbody className="text-slate-600 text-sm divide-y">
                            {internados.map(i => (
                                <tr key={i.idInternamiento} className="hover:bg-slate-50">
                                    <td className="p-4 font-bold text-slate-700">Historia HC-#{i.idHistoria}</td>
                                    <td className="p-4">{i.motivo}</td>
                                    <td className="p-4 text-slate-500">{`${i.fechaIngreso} - ${i.horaIngreso}`}</td>
                                    <td className="p-4 text-center">
                                        {i.fechaSalida ? (
                                            <span className="text-emerald-600 font-bold">{i.fechaSalida}</span>
                                        ) : (
                                            <span className="px-2.5 py-1 text-xs font-black bg-rose-50 text-rose-600 rounded-full border border-rose-200 animate-pulse">En Pabellón</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}