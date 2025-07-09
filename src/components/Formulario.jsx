Formulario.jsx
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function Formulario({ onAgregar }) {
  const [tipo, setTipo] = useState('Plástico');
  const [cantidad, setCantidad] = useState('');
  const [fecha, setFecha] = useState('');

  const manejarEnvio = e => {
    e.preventDefault();
    if (!cantidad || !fecha) return alert('Completa todos los campos.');

    onAgregar({ id: uuidv4(), tipo, cantidad: parseFloat(cantidad), fecha });
    setCantidad('');
    setFecha('');
  };

  return (
    <form onSubmit={manejarEnvio} className="mb-6 bg-green-50 p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-3">Agregar Reciclaje</h2>
      <div className="flex flex-col sm:flex-row gap-3">
        <select value={tipo} onChange={e => setTipo(e.target.value)} className="border p-2 rounded">
          <option>Plástico</option>
          <option>Papel</option>
          <option>Vidrio</option>
          <option>Orgánico</option>
        </select>
        <input type="number" min="0.1" step="0.1" placeholder="Cantidad (kg)" value={cantidad} onChange={e => setCantidad(e.target.value)} className="border p-2 rounded" />
        <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} className="border p-2 rounded" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Agregar</button>
      </div>
    </form>
  );
}
