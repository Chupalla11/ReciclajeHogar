import axios from 'axios';

export const obtenerCalidadAireOpenAQ = async () => {
  try {
    const response = await axios.get(
      'https://air-quality-api.open-meteo.com/v1/air-quality?latitude=-41.4693&longitude=-72.9424&current=pm10,pm2_5,carbon_monoxide&timezone=America%2FSantiago'
    );

    const current = response.data.current;
    
    return {
      pm10: current.pm10 || null,
      pm2_5: current.pm2_5 || null,
      co: current.carbon_monoxide || null,
      ciudad: 'Puerto Montt, Chile',
    };
  } catch (error) {
    console.error('Error calidad aire:', error.message);
    throw new Error('Error al obtener datos de calidad del aire');
  }
};