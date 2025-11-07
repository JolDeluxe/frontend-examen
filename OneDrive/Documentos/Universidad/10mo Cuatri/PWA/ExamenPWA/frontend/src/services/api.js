// DEBES CAMBIAR ESTO por la URL de tu backend
const API_URL = 'http://localhost:3001/api'; // <-- ❗ CORRECCIÓN 1: Puerto 3001

/**
 * Endpoint 1: /api/items?q=:query
 */
export const searchProducts = async (query) => {
  const response = await fetch(`${API_URL}/items?q=${encodeURIComponent(query)}`);
  if (!response.ok) throw new Error('Error en la búsqueda');
  return response.json();
};

/**
 * Endpoint 2: /api/items/:id
 */
export const getProductById = async (id) => {
  const response = await fetch(`${API_URL}/items/${id}`);
  if (!response.ok) throw new Error('Producto no encontrado');
  return response.json();
};

/**
 * Endpoint 3: /api/addSale
 * ❗ CORRECCIÓN 2: Aceptamos 'saleData' completo, no solo 'productId'
 */
export const addSale = async (saleData) => {
  const response = await fetch(`${API_URL}/addSale`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(saleData), // Enviamos el objeto de datos completo
  });
  if (!response.ok) throw new Error('Error al registrar la compra');
  return response.json();
};


export const getSales = async () => {
  const response = await fetch(`${API_URL}/sales`);
  if (!response.ok) throw new Error('Error al obtener las ventas');
  return response.json();
};