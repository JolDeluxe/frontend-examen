import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { searchProducts } from '../services/api.js';

export default function ItemList() {
  const [products, setProducts] = useState([]);
  const [resultCount, setResultCount] = useState(0);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const searchQuery = searchParams.get('search') || '';
  const [headerQuery, setHeaderQuery] = useState(searchQuery);

  useEffect(() => {
    if (searchQuery) {
      searchProducts(searchQuery)
        .then((response) => {
          // ❗ CORRECCIÓN 3: Ajustar a la respuesta del backend
          setProducts(response.items); // No 'response.products'
          setResultCount(response.count); // No 'response.total'
        })
        .catch((err) => console.error(err));
    }
  }, [searchQuery]);

  const handleSearch = () => {
    navigate(`/items?search=${headerQuery}`);
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);

  return (
    <div className="flex h-full flex-col">
      {/* Header con Búsqueda */}
      <header className="sticky top-0 z-10 flex items-center space-x-4 border-b bg-white p-4 shadow-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-7 w-7 flex-shrink-0 text-gray-700"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z"
          />
        </svg>
        <input
          type="text"
          value={headerQuery}
          onChange={(e) => setHeaderQuery(e.target.value)}
          onKeyUp={(e) => e.key === 'Enter' && handleSearch()}
          className="flex-1 rounded-md border border-gray-300 bg-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Buscar..."
        />
      </header>

      {/* Contenido Principal */}
      <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
        <p className="mb-4 text-sm text-gray-600">
          Resultados de la búsqueda de{' '}
          <span className="font-semibold">{searchQuery}</span>: {resultCount}
        </p>

        {/* Lista de Productos */}
        <div className="space-y-3">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/item/${product.id}`}
              className="flex transform cursor-pointer rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="mr-4 h-24 w-24 flex-shrink-0 rounded-full border border-gray-200 bg-gray-100 object-cover"
              />
              <div className="flex-1 overflow-hidden">
                <div className="flex items-start justify-between">
                  <h3 className="truncate text-lg font-bold text-gray-900">
                    {product.title}
                  </h3>
                  <span className="ml-2 flex-shrink-0 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                    {product.category}
                  </span>
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                  {product.description}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-800">
                    {formatPrice(product.price)}
                  </span>
                  <div className="flex items-center">
                    <span className="mr-1 text-sm text-gray-600">
                      {product.rating}
                    </span>
                    <svg
                      className="h-5 w-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.846 5.673a1 1 0 0 0 .95.69h5.968c.969 0 1.371 1.24.588 1.81l-4.834 3.51a1 1 0 0 0-.364 1.118l1.846 5.673c.3.921-.755 1.688-1.54 1.118l-4.834-3.51a1 1 0 0 0-1.175 0l-4.834 3.51c-.784.57-1.838-.197-1.54-1.118l1.846-5.673a1 1 0 0 0-.364-1.118L2.49 11.099c-.783-.57-.38-1.81.588-1.81h5.968a1 1 0 0 0 .95-.69L9.049 2.927Z" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}