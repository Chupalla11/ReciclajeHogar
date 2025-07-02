import React, { useState } from 'react';

export default function ListaRegistros({ registros, onActualizar, onEliminar }) {
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ tipo: '', cantidad: '', fecha: '' });

  const iniciarEdicion = (registro) => {
    setEditId(registro.id);
    setEditData({ tipo: registro.tipo, cantidad: registro.cantidad, fecha: registro.fecha });
  };

  const cancelarEdicion = () => {
    setEditId(null);
    setEditData({ tipo: '', cantidad: '', fecha: '' });
  };

  const guardarEdicion = () => {
    if (!editData.cantidad || !editData.fecha) return alert('Completa todos los campos.');
    onActualizar({ id: editId, tipo: editData.tipo, cantidad: parseFloat(editData.cantidad), fecha: editData.fecha });
    cancelarEdicion();
  };

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-3">Registros</h2>
      <ul className="divide-y border rounded">
        {registros.map(({ id, tipo, cantidad, fecha }) => (
          <li key={id} className="flex justify-between p-3 items-center">
            {editId === id ? (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 w-full">
                  <select value={editData.tipo} onChange={e => setEditData({ ...editData, tipo: e.target.value })} className="border p-1 rounded w-full sm:w-auto">
                    <option>Plástico</option>
                    <option>Papel</option>
                    <option>Vidrio</option>
                    <option>Orgánico</option>
                  </select>
                  <input type="number" min="0.1" step="0.1" value={editData.cantidad} onChange={e => setEditData({ ...editData, cantidad: e.target.value })} className="border p-1 rounded w-full sm:w-24" />
                  <input type="date" value={editData.fecha} onChange={e => setEditData({ ...editData, fecha: e.target.value })} className="border p-1 rounded w-full sm:w-auto" />
                </div>
                <div className="flex gap-2 ml-4">
                  <button onClick={guardarEdicion} className="bg-green-600 text-white rounded px-3 py-1 hover:bg-green-700">Guardar</button>
                  <button onClick={cancelarEdicion} className="bg-gray-400 text-white rounded px-3 py-1 hover:bg-gray-500">Cancelar</button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <p><strong>{tipo}</strong> - {cantidad} kg</p>
                  <p className="text-sm text-gray-600">{fecha}</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => iniciarEdicion({ id, tipo, cantidad, fecha })} className="text-blue-600 hover:text-blue-800 font-semibold">Editar</button>
                  <button onClick={() => { if (window.confirm('¿Eliminar este registro?')) onEliminar(id); }} className="text-red-600 hover:text-red-800 font-semibold">Eliminar</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}