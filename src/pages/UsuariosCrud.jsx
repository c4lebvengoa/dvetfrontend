import React, { useState, useEffect } from 'react';
import API from '../api/api';

export default function UsuariosCrud() {
    const [usuarios, setUsuarios] = useState([]);
    const [personalList, setPersonalList] = useState([]); // Almacena los trabajadores de la clínica
    const [search, setSearch] = useState('');
    const [form, setForm] = useState({
        usuario: '', 
        correo: '', 
        contrasena: '', 
        rol: 'Ventas', 
        codPersonal: '' // Aquí guardaremos el ID del trabajador seleccionado
    });

    // 1. Cargar la lista de cuentas de usuario del sistema
    const cargarUsuarios = async () => {
        try {
            const res = await API.get(`/usuarios?search=${search}`);
            setUsuarios(res.data);
        } catch (error) {
            console.error("Error al cargar usuarios:", error);
        }
    };

    // 2. Cargar la lista de personal disponible (para el Select)
    const cargarPersonal = async () => {
        try {
            // Nota: Cambia '/personal' por la ruta exacta de tu controlador que lista trabajadores
            const res = await API.get('/personal'); 
            setPersonalList(res.data);
        } catch (error) {
            console.error("Error al cargar la lista de personal:", error);
        }
    };

    // Control de ejecuciones automáticas
    useEffect(() => { 
        cargarUsuarios(); 
    }, [search]);

    useEffect(() => {
        cargarPersonal();
    }, []);

    // 3. Envío de datos al Backend en Spring Boot
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Construimos el payload limpio de forma transparente para el operador
        const payload = {
            usuario: form.usuario,
            correo: form.correo,
            contrasena: form.contrasena,
            rol: form.rol,
            codPersonal: form.codPersonal ? parseInt(form.codPersonal) : null,
            codPropietario: null // Siempre null ya que el propietario se maneja aparte
        };

        try {
            await API.post('/usuarios', payload);
            alert('Usuario asignado y contraseña encriptada de forma segura.');
            
            // Limpiamos el formulario restableciendo el estado original
            setForm({ usuario: '', correo: '', contrasena: '', rol: 'Ventas', codPersonal: '' });
            cargarUsuarios();
        } catch (error) {
            alert('Error al crear el usuario. Asegúrate de que las credenciales no estén duplicadas.');
        }
    };

    return (
        <div className="p-8 bg-slate-50 min-h-screen font-sans">
            <h1 className="text-3xl font-bold text-slate-800 mb-6 border-b-2 border-slate-200 pb-3">Cuentas de Usuarios</h1>
            
            {/* Barra de Búsqueda */}
            <input type="text" placeholder="Filtrar por credenciales..." value={search} onChange={e => setSearch(e.target.value)} className="w-full max-w-md p-3 mb-6 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Formulario de Registro / Vinculación */}
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md flex flex-col gap-4 border border-slate-100 h-fit">
                    <h2 className="text-xl font-semibold text-slate-700 mb-2">Asignar Credencial</h2>
                    
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Nombre de Usuario</label>
                        <input type="text" placeholder="Ej: amendoza" value={form.usuario} onChange={e => setForm({...form, usuario: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm outline-none" required />
                    </div>
                    
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Correo Corporativo</label>
                        <input type="email" placeholder="correo@dpocaspulgas.com" value={form.correo} onChange={e => setForm({...form, correo: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm outline-none" required />
                    </div>
                    
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Contraseña Temporal</label>
                        <input type="password" placeholder="••••••••" value={form.contrasena} onChange={e => setForm({...form, contrasena: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm outline-none" required />
                    </div>
                    
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Rol del Sistema</label>
                        <select value={form.rol} onChange={e => setForm({...form, rol: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-purple-500 text-sm outline-none">
                            <option value="Administrador">Administrador</option>
                            <option value="Medico">Médico Veterinario</option>
                            <option value="Ventas">Personal de Ventas</option>
                            <option value="Spa">Estilista Spa</option>
                        </select>
                    </div>

                    {/* Selector Desplegable Dinámico del Personal */}
                    <div className="flex flex-col gap-1 mt-1">
                        <label className="text-xs font-semibold text-slate-500">Vincular a Trabajador:</label>
                        <select 
                            value={form.codPersonal} 
                            onChange={e => setForm({...form, codPersonal: e.target.value})} 
                            className="w-full p-2.5 border border-slate-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-purple-500 outline-none" 
                            required
                        >
                            <option value="">-- Seleccione un Empleado --</option>
                            {personalList.map(p => (
                                <option key={p.id} value={p.id}>
                                    {p.nombre} {p.apellido} — [{p.cargo || 'Personal'}]
                                </option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg font-bold shadow-md transition-colors mt-2">Vincular Cuenta</button>
                </form>

                {/* Tabla de Cuentas de Usuario Existentes */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-md border border-slate-100 p-4 overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-100 text-slate-700 font-semibold text-sm border-b">
                                <th className="p-4">Usuario</th>
                                <th className="p-4">Correo</th>
                                <th className="p-4">Rol Asignado</th>
                                <th className="p-4">Estado</th>
                            </tr>
                        </thead>
                        <tbody className="text-slate-600 text-sm divide-y">
                            {usuarios.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="p-4 text-center text-slate-400">No se encontraron cuentas registradas.</td>
                                </tr>
                            ) : (
                                usuarios.map(u => (
                                    <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                                        <td className="p-4 font-semibold text-slate-800">{u.usuario}</td>
                                        <td className="p-4">{u.correo}</td>
                                        <td className="p-4">
                                            <span className="px-2.5 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-bold border border-purple-200">
                                                {u.rol}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            {u.activo === 1 ? (
                                                <span className="inline-flex items-center text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded text-xs border border-emerald-200">Activo</span>
                                            ) : (
                                                <span className="inline-flex items-center text-red-500 font-bold bg-red-50 px-2 py-0.5 rounded text-xs border border-red-200">Inactivo</span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}