import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function CalidadAire() {
  const [datosAire, setDatosAire] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCalidadAire = async () => {
      try {
        const response = await axios.get(
          'https://air-quality-api.open-meteo.com/v1/air-quality?latitude=-41.4693&longitude=-72.9424&hourly=pm10,pm2_5,carbon_monoxide'
        );

        const { hourly } = response.data;
        const ultimoIndice = hourly.time.length - 1;

        setDatosAire({
          pm10: hourly.pm10[ultimoIndice],
          pm2_5: hourly.pm2_5[ultimoIndice],
          co: hourly.carbon_monoxide[ultimoIndice],
          ciudad: 'Puerto Montt, Chile',
        });
        setError(null);
      } catch (err) {
        setError('Error al obtener datos de calidad del aire');
      }
    };

    fetchCalidadAire();
  }, []);

  if (error) {
    return <p className="text-red-600 text-center">{error}</p>;
  }

  if (!datosAire) {
    return <p className="text-gray-600 text-center">Cargando calidad del aire...</p>;
  }

  return (
    <section className="bg-blue-100 p-4 rounded shadow max-w-md mx-auto mb-6 text-center">
      <h3 className="text-xl font-semibold mb-2">🌬️ Calidad del aire en {datosAire.ciudad}</h3>
      <p>PM10: <strong>{datosAire.pm10 !== null ? datosAire.pm10.toFixed(1) : 'N/A'} µg/m³</strong></p>
      <p>PM2.5: <strong>{datosAire.pm2_5 !== null ? datosAire.pm2_5.toFixed(1) : 'N/A'} µg/m³</strong></p>
      <p>Monóxido de carbono (CO): <strong>{datosAire.co !== null ? datosAire.co.toFixed(2) : 'N/A'} ppm</strong></p>
    </section>
  );
}
