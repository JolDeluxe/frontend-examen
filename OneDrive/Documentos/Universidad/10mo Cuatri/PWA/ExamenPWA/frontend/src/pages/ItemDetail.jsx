import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, addSale } from '../services/api.js';

export default function ItemDetail() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getProductById(id)
        .then((data) => setProduct(data))
        .catch((err) => console.error(err));
    }
  }, [id]);

  const handleBuy = () => {
    if (!product) return;

    const saleData = {
      productId: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
    };

    addSale(saleData)
      .then((response) => {
        if (response === true) {
          navigate('/sales');
        } else {
          alert('Hubo un error al procesar la compra.');
        }
      })
      .catch((err) => alert(err.message));
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);

  if (!product) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-gray-500">Cargando producto...</p>
      </div>
    );
  }

  // Prepara la imagen principal
  const img1 = product.images[0]?.url || product.thumbnail;

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-white p-4 shadow-sm">
        <button onClick={() => navigate(-1)} className="text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-7 w-7 text-gray-700"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z"
          />
        </svg>
      </header>

      {/* Contenido del Producto */}
      <main className="flex-1 overflow-y-auto bg-white p-6">
        {/* ❗ IMAGEN GRANDE (CORREGIDO) */}
        <div className="mb-6">
          <img
            src={img1}
            alt={product.title}
            className="h-64 w-full rounded-lg border border-gray-200 object-cover shadow-sm"
          />
        </div>

        <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
        <span className="text-sm font-medium text-blue-600">
          {product.category}
        </span>
        <p className="mt-4 text-base text-gray-700">{product.description}</p>
        <p className="my-6 text-4xl font-bold text-gray-900">
          {formatPrice(product.price)}
        </p>

        {/* Rating */}
        <div className="mb-8 flex items-center">
          <span className="mr-2 text-lg text-gray-700">{product.rating}</span>
          <div className="flex text-yellow-400">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.846 5.673a1 1 0 0 0 .95.69h5.968c.969 0 1.371 1.24.588 1.81l-4.834 3.51a1 1 0 0 0-.364 1.118l1.846 5.673c.3.921-.755 1.688-1.54 1.118l-4.834-3.51a1 1 0 0 0-1.175 0l-4.834 3.51c-.784.57-1.838-.197-1.54-1.118l1.846-5.673a1 1 0 0 0-.364-1.118L2.49 11.099c-.783-.57-.38-1.81.588-1.81h5.968a1 1 0 0 0 .95-.69L9.049 2.927Z" />
            </svg>
          </div>
        </div>

        <button
          onClick={handleBuy}
          className="w-full transform rounded-lg bg-blue-600 py-4 text-xl font-bold text-white shadow-lg transition-transform duration-200 hover:bg-blue-700 active:scale-95"
        >
          Comprar
        </button>
      </main>
    </div>
  );
}