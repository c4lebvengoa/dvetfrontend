import React, { useState, useEffect } from 'react';
import API from '../api/api';

export default function UsuariosCrud() {
    const [usuarios, setUsuarios] = useState([]);
    const [search, setSearch] = useState('');
    const [form, setForm] = useState({
        usuario: '', correo: '', contrasena: '', rol: 'Ventas', codPersonal: '', codPropietario: ''
    });

    const cargarUsuarios = async () => {
        const res = await API.get(`/usuarios?search=${search}`);
        setUsuarios(res.data);
    };

    useEffect(() => { cargarUsuarios(); }, [search]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...form,
            codPersonal: form.codPersonal ? parseInt(form.codPersonal) : null,
            codPropietario: form.codPropietario ? parseInt(form.codPropietario) : null
        };
        await API.post('/usuarios', payload);
        alert('Usuario asignado y contraseña encriptada de forma segura.');
        setForm({ usuario: '', correo: '', contrasena: '', rol: 'Ventas', codPersonal: '', codPropietario: '' });
        cargarUsuarios();
    };

    return (
        <div className="p-8 bg-slate-50 min-h-screen font-sans">
            <h1 className="text-3xl font-bold text-slate-800 mb-6 border-b-2 border-slate-200 pb-3">Cuentas de Usuarios</h1>
            <input type="text" placeholder="Filtrar por credenciales..." value={search} onChange={e => setSearch(e.target.value)} className="w-full max-w-md p-3 mb-6 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 outline-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md flex flex-col gap-4 border border-slate-100 h-fit">
                    <h2 className="text-xl font-semibold text-slate-700 mb-2">Asignar Credencial</h2>
                    <input type="text" placeholder="Username" value={form.usuario} onChange={e => setForm({...form, usuario: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm outline-none" required />
                    <input type="email" placeholder="Correo corporativo" value={form.correo} onChange={e => setForm({...form, correo: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm outline-none" required />
                    <input type="password" placeholder="Contraseña de acceso" value={form.contrasena} onChange={e => setForm({...form, contrasena: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm outline-none" required />
                    <select value={form.rol} onChange={e => setForm({...form, rol: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-purple-500 text-sm outline-none">
                        <option value="Administrador">Administrador</option>
                        <option value="Medico">Médico Veterinario</option>
                        <option value="Ventas">Personal de Ventas</option>
                        <option value="Spa">Estilista Spa</option>
                    </select>
                    <div className="grid grid-cols-2 gap-3">
                        <input type="number" placeholder="ID Personal (FK)" value={form.codPersonal} onChange={e => setForm({...form, codPersonal: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded-lg text-sm outline-none" />
                        <input type="number" placeholder="ID Cliente (FK)" value={form.codPropietario} onChange={e => setForm({...form, codPropietario: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded-lg text-sm outline-none" />
                    </div>
                    <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg font-bold shadow-md transition">Vincular Cuenta</button>
                </form>

                <div className="lg:col-span-2 bg-white rounded-xl shadow-md border p-4">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-100 text-slate-700 font-semibold text-sm border-b">
                                <th className="p-4">Usuario</th>
                                <th className="p-4">Correo</th>
                                <th className="p-4">Rol Vinculado</th>
                                <th className="p-4">Estado</th>
                            </tr>
                        </thead>
                        <tbody className="text-slate-600 text-sm divide-y">
                            {usuarios.map(u => (
                                <tr key={u.id} className="hover:bg-slate-50">
                                    <td className="p-4 font-semibold text-slate-800">{u.usuario}</td>
                                    <td className="p-4">{u.correo}</td>
                                    <td className="p-4"><span className="px-2.5 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-bold border border-purple-200">{u.rol}</span></td>
                                    <td className="p-4">{u.activo === 1 ? <span className="text-emerald-600 font-bold">Activo</span> : <span className="text-red-500 font-bold">Inactivo</span>}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}