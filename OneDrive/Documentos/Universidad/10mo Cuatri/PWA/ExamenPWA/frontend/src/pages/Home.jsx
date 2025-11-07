import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim().length > 0) {
      navigate(`/items?search=${query}`);
    }
  };

  return (
    <div className="flex h-full flex-col items-center justify-center space-y-8 bg-white p-6">
      {/* Logo (Ícono de Bolsa) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-24 w-24 text-gray-800"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z"
        />
      </svg>

      {/* Título */}
      <h1 className="text-4xl font-bold text-gray-900">Bazar Online</h1>

      {/* Caja de búsqueda */}
      <div className="flex w-full max-w-md">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyUp={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Buscar productos..."
          className="flex-1 rounded-l-md border border-gray-300 p-3 text-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="rounded-r-md bg-gray-800 px-6 py-3 text-lg font-semibold text-white hover:bg-gray-700"
        >
          Buscar
        </button>
      </div>
    </div>
  );
}