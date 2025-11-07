import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSales } from '../services/api.js';

export default function SalesList() {
  const [sales, setSales] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getSales()
      .then((data) => setSales(data))
      .catch((err) => console.error(err));
  }, []); // Cargar solo una vez

  // Helper para formatear precio
  const formatPrice = (price) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);

  // Helper para formatear fecha
  const formatDate = (dateString) =>
    new Intl.DateTimeFormat('es-ES', {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(new Date(dateString));

  return (
    <div className="flex h-full flex-col bg-white p-6">
      <h1 className="my-6 text-center text-3xl font-bold text-gray-900">
        Registered Purchases
      </h1>

      {/* Lista de Compras */}
      <div className="flex-1 space-y-3 overflow-y-auto">
        {sales.length > 0 ? (
          sales.map((sale) => (
            <div
              key={sale.id}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4"
            >
              <div>
                <p className="font-semibold text-gray-800">
                  {sale.productTitle}
                </p>
                <p className="text-sm text-gray-500">
                  Comprado el: {formatDate(sale.purchaseDate)}
                </p>
              </div>
              <span className="font-bold text-gray-900">
                {formatPrice(sale.pricePaid)}
              </span>
            </div>
          ))
        ) : (
          <div className="pt-10 text-center">
            <p className="text-gray-500">Aún no tienes compras registradas.</p>
          </div>
        )}
      </div>

      {/* Botón Salir */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => navigate('/')}
          className="w-full max-w-sm rounded-lg bg-gray-700 px-8 py-3 text-lg font-semibold text-white hover:bg-gray-600"
        >
          Salir
        </button>
      </div>
    </div>
  );
}