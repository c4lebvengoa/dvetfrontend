import React, { useState } from 'react';
import API from '../api/api';

export default function NuevaVenta() {
    const [cart, setCart] = useState([]);
    const [formaPago, setFormaPago] = useState('Efectivo');
    const [codPropietario, setCodPropietario] = useState('');
    const [codPersonal, setCodPersonal] = useState('');
    
    const [idProducto, setIdProducto] = useState('');
    const [cantidad, setCantidad] = useState(1);
    const [precio, setPrecio] = useState('');

    const agregarAlCarrito = () => {
        if (!idProducto || cantidad <= 0 || !precio) return;
        const item = {
            idProducto: parseInt(idProducto),
            cantidad: parseInt(cantidad),
            importe: parseFloat(precio) * parseInt(cantidad)
        };
        setCart([...cart, item]);
        setIdProducto('');
        setCantidad(1);
        setPrecio('');
    };

    const total = () => cart.reduce((sum, i) => sum + i.importe, 0).toFixed(2);

    const facturarVenta = async () => {
        if (cart.length === 0) return alert('El detalle de venta está vacío.');
        
        const payload = {
            fechaEmision: new Date().toISOString().split('T')[0],
            formaPago,
            importeTotal: parseFloat(total()),
            codPropietario: codPropietario ? parseInt(codPropietario) : null,
            codPersonal: codPersonal ? parseInt(codPersonal) : null,
            detalles: cart
        };

        try {
            await API.post('/ventas', payload);
            alert('¡Venta realizada con éxito transaccional!');
            setCart([]);
            setCodPropietario('');
            setCodPersonal('');
        } catch (err) {
            alert('Error al registrar la boleta.');
        }
    };

    return (
        <div className="max-w-5xl mx-auto my-10 p-8 bg-white rounded-2xl shadow-xl border border-slate-100 font-sans">
            <h1 className="text-3xl font-bold text-slate-800 mb-6 border-b pb-3">Punto de Venta - Boleta Electrónica</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div>
                    <label className="block text-sm font-semibold text-slate-600 mb-1">Forma de Pago</label>
                    <select value={formaPago} onChange={e => setFormaPago(e.target.value)} className="w-full p-2.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm">
                        <option value="Efectivo">Efectivo</option>
                        <option value="Tarjeta">Tarjeta</option>
                        <option value="Yape">Yape / Plin</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-slate-600 mb-1">ID Propietario (Cliente)</label>
                    <input type="number" value={codPropietario} onChange={e => setCodPropietario(e.target.value)} className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm" placeholder="Ej. 1" />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-slate-600 mb-1">ID Vendedor (Personal)</label>
                    <input type="number" value={codPersonal} onChange={e => setCodPersonal(e.target.value)} className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm" placeholder="Ej. 2" />
                </div>
            </div>

            <h2 className="text-lg font-bold text-slate-700 mb-3 pb-1 border-b border-slate-100">Agregar ítems al detalle</h2>
            <div className="bg-slate-50 p-5 rounded-xl grid grid-cols-1 md:grid-cols-4 gap-4 items-end mb-8">
                <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">ID Producto</label>
                    <input type="number" value={idProducto} onChange={e => setIdProducto(e.target.value)} className="w-full p-2.5 border border-slate-300 bg-white rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Precio Unitario (S/.)</label>
                    <input type="number" value={precio} onChange={e => setPrecio(e.target.value)} className="w-full p-2.5 border border-slate-300 bg-white rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm" placeholder="0.00" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Cantidad</label>
                    <input type="number" value={cantidad} onChange={e => setCantidad(e.target.value)} className="w-full p-2.5 border border-slate-300 bg-white rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm" />
                </div>
                <button type="button" onClick={agregarAlCarrito} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white p-2.5 rounded-lg font-bold shadow transition">
                    + Añadir Ítem
                </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-6">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-100 border-b border-slate-200">
                        <tr>
                            <th className="p-4 text-sm font-semibold text-slate-700">Línea de Producto</th>
                            <th className="p-4 text-sm font-semibold text-slate-700">Cantidad</th>
                            <th className="p-4 text-sm font-semibold text-slate-700">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-600 text-sm">
                        {cart.map((item, index) => (
                            <tr key={index} className="hover:bg-slate-50">
                                <td className="p-4">Producto / Servicio #{item.idProducto}</td>
                                <td className="p-4 font-medium">{item.cantidad} unidades</td>
                                <td className="p-4 font-bold text-slate-800">S/. {item.importe.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-col items-end gap-3">
                <div className="text-2xl font-black text-slate-800">
                    Total Neto: <span className="text-indigo-600">S/. {total()}</span>
                </div>
                <button onClick={facturarVenta} className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg transition transform active:scale-95">
                    Procesar y Emitir Boleta
                </button>
            </div>
        </div>
    );
}