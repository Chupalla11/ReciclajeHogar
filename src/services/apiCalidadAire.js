import axios from 'axios';

export const obtenerCalidadAire = async (lat, lon) => {
  try {
    const response = await axios.get('https://air-quality-api.open-meteo.com/v1/air-quality?latitude=-41.4693&longitude=-72.9424&hourly=pm10,,carbon_monoxide');
    const hora = new Date().getHours();pm2_5
    return {
      pm10: response.data.hourly.pm10[hora],
      co: response.data.hourly.carbon_monoxide[hora]
    };
  } catch (error) {
    console.error('Error calidad aire:', error.message);
    return { pm10: null, co: null };
  }
};