import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { startOfWeek, startOfMonth, format } from 'date-fns';
import { FaFlagCheckered, FaChartBar } from 'react-icons/fa';

export default function Estadisticas({ registros }) {
  const [periodo, setPeriodo] = useState('semana');
  const [meta, setMeta] = useState(() => {
    const guardada = localStorage.getItem('metaReciclaje');
    return guardada ? Number(guardada) : 10;
  });

// Guardar meta en localStorage
  React.useEffect(() => {
    localStorage.setItem('metaReciclaje', meta);
  }, [meta]);

  const datosAgrupados = useMemo(() => {
    if (registros.length === 0) return [];
    const grupos = {};
    registros.forEach(({ cantidad, fecha }) => {
      const date = new Date(fecha);
      let key = periodo === 'semana'
        ? format(startOfWeek(date, { weekStartsOn: 1 }), 'yyyy-MM-dd')
        : format(startOfMonth(date), 'yyyy-MM');
      grupos[key] = (grupos[key] || 0) + cantidad;
    });
    return Object.entries(grupos).map(([periodo, cantidad]) => ({ periodo, cantidad: +cantidad.toFixed(2) })).sort((a, b) => a.periodo.localeCompare(b.periodo));
  }, [registros, periodo]);

  const ultimo = datosAgrupados.at(-1);
  const progreso = ultimo ? Math.min((ultimo.cantidad / meta) * 100, 100) : 0;

  return (
    <section className="mb-8 bg-white p-6 rounded shadow text-center max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 flex justify-center items-center gap-2">
        <FaChartBar className="text-green-600" /> Estadísticas de Reciclaje
      </h2>
      <div className="mb-4 flex flex-col sm:flex-row sm:justify-center sm:items-center gap-4">
        <div className="flex items-center gap-2 justify-center">
          <label htmlFor="periodo" className="font-medium">Ver por:</label>
          <select id="periodo" value={periodo} onChange={e => setPeriodo(e.target.value)} className="border rounded p-1">
            <option value="semana">Semana</option>
            <option value="mes">Mes</option>
          </select>
        </div>
        <div className="flex items-center gap-2 justify-center">
          <label htmlFor="meta" className="font-medium">Meta (kg):</label>
          <input
            id="meta"
            type="number"
            value={meta}
            min={1}
            onChange={(e) => setMeta(Number(e.target.value))}
            className="border rounded p-1 w-24 text-center"
          />
        </div>
      </div>
      {datosAgrupados.length === 0 ? <p className="text-gray-600">No hay datos para mostrar.</p> : (
        <>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={datosAgrupados} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="periodo" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cantidad" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4">
            <p className="flex justify-center items-center gap-2"><FaFlagCheckered className="text-green-600" /> Meta: <strong>{meta} kg</strong> reciclados por {periodo}</p>
            <div className="w-full bg-gray-300 rounded-full h-6 mt-1 overflow-hidden mx-auto max-w-xl">
              <div className="bg-green-600 h-6" style={{ width: `${progreso}%`, transition: 'width 0.5s ease' }} />
            </div>
            <p className="mt-2">{progreso.toFixed(1)}% del objetivo</p>
          </div>
        </>
      )}
    </section>
  );
}
