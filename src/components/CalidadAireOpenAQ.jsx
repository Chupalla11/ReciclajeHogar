import React, { useEffect, useState } from 'react';
import { obtenerCalidadAireOpenAQ } from '../services/apiCalidadAire';

export default function CalidadAireOpenAQ() {
  const [datosAire, setDatosAire] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCalidadAire = async () => {
      try {
        const datos = await obtenerCalidadAireOpenAQ();
        setDatosAire(datos);
        setError(null);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCalidadAire();
  }, []);

  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-4">
        <p className="text-red-600 text-center bg-red-50 p-4 rounded">{error}</p>
      </div>
    );
  }

  if (!datosAire) {
    return (
      <div className="max-w-2xl mx-auto px-4">
        <p className="text-gray-600 text-center bg-gray-50 p-4 rounded">Cargando calidad del aire...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="bg-blue-100 p-6 rounded shadow text-center">
        <h3 className="text-xl font-semibold mb-4">🌬️ Calidad del aire en {datosAire.ciudad}</h3>
        
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          <div className="bg-white p-4 rounded shadow">
            <h4 className="font-medium mb-2">PM10</h4>
            <p className="text-lg font-bold">
              {datosAire.pm10 !== null ? `${datosAire.pm10.toFixed(1)} µg/m³` : 'N/A'}
            </p>
          </div>
          
          <div className="bg-white p-4 rounded shadow">
            <h4 className="font-medium mb-2">PM2.5</h4>
            <p className="text-lg font-bold">
              {datosAire.pm2_5 !== null ? `${datosAire.pm2_5.toFixed(1)} µg/m³` : 'N/A'}
            </p>
          </div>
          
          <div className="bg-white p-4 rounded shadow">
            <h4 className="font-medium mb-2">Monóxido de carbono (CO)</h4>
            <p className="text-lg font-bold">
              {datosAire.co !== null ? `${datosAire.co.toFixed(2)} ppm` : 'N/A'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}