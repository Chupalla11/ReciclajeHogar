export const guardarRegistros = (data) => {
  localStorage.setItem('registros', JSON.stringify(data));
};

export const obtenerRegistros = () => {
  return JSON.parse(localStorage.getItem('registros')) || [];
};
