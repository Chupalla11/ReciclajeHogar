import React, { useState, useEffect } from 'react';
import CalidadAire from './components/CalidadAire';
import Estadisticas from './components/Estadisticas';

const tiposMaterial = ['Plástico', 'Papel', 'Vidrio', 'Metal', 'Orgánico', 'Otro'];

export default function App() {
  const [registros, setRegistros] = useState(() => {
    const guardados = localStorage.getItem('registrosReciclaje');
    return guardados ? JSON.parse(guardados) : [];
  });

  const [form, setForm] = useState({
    tipo: tiposMaterial[0],
    cantidad: '',
    fecha: new Date().toISOString().slice(0, 10),
    idEditar: null,
  });

// Guardar en localStorage
  useEffect(() => {
    localStorage.setItem('registrosReciclaje', JSON.stringify(registros));
  }, [registros]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const cantidadNum = parseFloat(form.cantidad);
    if (!cantidadNum || cantidadNum <= 0) {
      alert('Ingrese una cantidad válida mayor que 0');
      return;
    }

    if (form.idEditar !== null) {
        // Actualizar registro
      setRegistros(prev =>
        prev.map(r => (r.id === form.idEditar ? { ...r, tipo: form.tipo, cantidad: cantidadNum, fecha: form.fecha } : r))
      );
    } else {

// Crear nuevo registro
      setRegistros(prev => [
        ...prev,
        {
          id: Date.now(),
          tipo: form.tipo,
          cantidad: cantidadNum,
          fecha: form.fecha,
        },
      ]);
    }

// Limpiar formulario
    setForm({ tipo: tiposMaterial[0], cantidad: '', fecha: new Date().toISOString().slice(0, 10), idEditar: null });
  };

  const handleEditar = id => {
    const reg = registros.find(r => r.id === id);
    if (!reg) return;
    setForm({ tipo: reg.tipo, cantidad: reg.cantidad.toString(), fecha: reg.fecha, idEditar: reg.id });
  };

  const handleEliminar = id => {
    if (window.confirm('¿Eliminar este registro?')) {
      setRegistros(prev => prev.filter(r => r.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-green-50 p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-800">Gestión de Reciclaje en Hogares ♻️</h1>

      <CalidadAire />

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-8 max-w-xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Registrar reciclaje</h2>
        <div className="flex flex-col gap-4">
          <label className="flex flex-col">
            Tipo de material:
            <select name="tipo" value={form.tipo} onChange={handleChange} className="border rounded p-2 mt-1">
              {tiposMaterial.map(tipo => (
                <option key={tipo} value={tipo}>{tipo}</option>
              ))}
            </select>
          </label>

          <label className="flex flex-col">
            Cantidad estimada (kg):
            <input
              type="number"
              name="cantidad"
              value={form.cantidad}
              onChange={handleChange}
              min="0.01"
              step="0.01"
              className="border rounded p-2 mt-1"
              required
            />
          </label>

          <label className="flex flex-col">
            Fecha:
            <input
              type="date"
              name="fecha"
              value={form.fecha}
              onChange={handleChange}
              className="border rounded p-2 mt-1"
              required
              max={new Date().toISOString().slice(0, 10)}
            />
          </label>

          <button
            type="submit"
            className="bg-green-600 text-white rounded py-2 font-semibold hover:bg-green-700 transition"
          >
            {form.idEditar !== null ? 'Actualizar' : 'Agregar'}
          </button>
        </div>
      </form>

      <section className="mb-8 max-w-xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Registros</h2>
        {registros.length === 0 ? (
          <p className="text-center text-gray-600">No hay registros aún.</p>
        ) : (
          <table className="w-full border-collapse border border-green-300 rounded">
            <thead className="bg-green-200">
              <tr>
                <th className="border border-green-300 p-2">Fecha</th>
                <th className="border border-green-300 p-2">Material</th>
                <th className="border border-green-300 p-2">Cantidad (kg)</th>
                <th className="border border-green-300 p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {registros.map(({ id, tipo, cantidad, fecha }) => (
                <tr key={id} className="text-center odd:bg-green-50">
                  <td className="border border-green-300 p-2">{fecha}</td>
                  <td className="border border-green-300 p-2">{tipo}</td>
                  <td className="border border-green-300 p-2">{cantidad.toFixed(2)}</td>
                  <td className="border border-green-300 p-2 space-x-2">
                    <button
                      onClick={() => handleEditar(id)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleEliminar(id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <Estadisticas registros={registros} />
    </div>
  );
}