import React, { useState, useEffect } from 'react';
import API from '../api/api';

export default function PersonalCrud() {
    const [personal, setPersonal] = useState([]);
    const [search, setSearch] = useState('');
    const [form, setForm] = useState({
        nombres: '', apPaterno: '', apMaterno: '', tipoDoc: 'DNI', nroDoc: '',
        celular: '', correo: '', direccion: '', fechaIngreso: '', sueldo: '',
        seguroVida: 'Activo', cv: 'Adjuntado', idTipoPersonal: '1', idDistrito: '34'
    });

    const cargarPersonal = async () => {
        try {
            const res = await API.get(`/personal?search=${search}`);
            setPersonal(res.data);
        } catch (err) {
            console.error("Error cargando personal", err);
        }
    };

    useEffect(() => {
        cargarPersonal();
    }, [search]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...form,
            sueldo: form.sueldo ? parseFloat(form.sueldo) : 0.0,
            idTipoPersonal: form.idTipoPersonal ? parseInt(form.idTipoPersonal) : null,
            idDistrito: form.idDistrito ? parseInt(form.idDistrito) : null
        };
        try {
            await API.post('/personal', payload);
            alert('¡Personal registrado exitosamente!');
            setForm({
                nombres: '', apPaterno: '', apMaterno: '', tipoDoc: 'DNI', nroDoc: '',
                celular: '', correo: '', direccion: '', fechaIngreso: '', sueldo: '',
                seguroVida: 'Activo', cv: 'Adjuntado', idTipoPersonal: '1', idDistrito: '34'
            });
            cargarPersonal(); // ← FIX: eliminado cargarUsuarios() que no existe aquí
        } catch (err) {
            console.error("Error en el registro:", err);
            alert('Error en el registro. Verifique que los campos numéricos e IDs sean válidos.');
        }
    };

    const handleEliminar = async (id) => {
        if (window.confirm('¿Está seguro de eliminar este registro?')) {
            try {
                await API.delete(`/personal/${id}`);
                cargarPersonal();
            } catch (err) {
                console.error("Error al eliminar", err);
                alert('No se pudo eliminar el registro.');
            }
        }
    };

    return (
        <div className="p-8 bg-slate-50 min-h-screen font-sans">
            <h1 className="text-3xl font-bold text-slate-800 mb-6 border-b-2 border-slate-200 pb-3">Módulo de Personal</h1>

            <input
                type="text"
                placeholder="Buscar por nombre o DNI..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full max-w-md p-3 mb-6 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Formulario */}
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md flex flex-col gap-4 h-fit border border-slate-100">
                    <h2 className="text-xl font-semibold text-slate-700 mb-2">Nuevo Empleado</h2>

                    <input type="text" placeholder="Nombres" value={form.nombres} onChange={e => setForm({...form, nombres: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" required />

                    <div className="grid grid-cols-2 gap-3">
                        <input type="text" placeholder="Ap. Paterno" value={form.apPaterno} onChange={e => setForm({...form, apPaterno: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" required />
                        <input type="text" placeholder="Ap. Materno" value={form.apMaterno} onChange={e => setForm({...form, apMaterno: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" required />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        <select value={form.tipoDoc} onChange={e => setForm({...form, tipoDoc: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none text-sm">
                            <option value="DNI">DNI</option>
                            <option value="CE">C.E.</option>
                        </select>
                        <input type="text" placeholder="Número Doc." value={form.nroDoc} onChange={e => setForm({...form, nroDoc: e.target.value})} className="col-span-2 w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" required />
                    </div>

                    <input type="text" placeholder="Celular" value={form.celular} onChange={e => setForm({...form, celular: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" required />
                    <input type="email" placeholder="Correo" value={form.correo} onChange={e => setForm({...form, correo: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                    <input type="date" value={form.fechaIngreso} onChange={e => setForm({...form, fechaIngreso: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm text-slate-600" required />
                    <input type="number" step="0.01" placeholder="Sueldo (S/.)" value={form.sueldo} onChange={e => setForm({...form, sueldo: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" required />

                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-bold shadow-md transition">Guardar Colaborador</button>
                </form>

                {/* Tabla */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-md overflow-hidden border border-slate-100 p-4">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-100 text-slate-700 font-semibold text-sm border-b border-slate-200">
                                    <th className="p-4">Empleado</th>
                                    <th className="p-4">Documento</th>
                                    <th className="p-4">Celular</th>
                                    <th className="p-4">Sueldo</th>
                                    <th className="p-4 text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-600 text-sm divide-y divide-slate-100">
                                {personal.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="p-4 text-center text-slate-400">No se encontraron colaboradores registrados.</td>
                                    </tr>
                                ) : (
                                    personal.map(p => (
                                        <tr key={p.codPersonal} className="hover:bg-slate-50 transition">
                                            <td className="p-4 font-medium text-slate-800">{`#${p.codPersonal} - ${p.nombres} ${p.apPaterno}`}</td>
                                            <td className="p-4">{p.nroDoc}</td>
                                            <td className="p-4">{p.celular}</td>
                                            <td className="p-4 font-semibold text-emerald-600">S/. {p.sueldo}</td>
                                            <td className="p-4 text-center">
                                                <button onClick={() => handleEliminar(p.codPersonal)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-xs font-semibold shadow transition">Eliminar</button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}