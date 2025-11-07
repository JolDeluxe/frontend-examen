import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import ItemList from './pages/ItemList.jsx';
import ItemDetail from './pages/ItemDetail.jsx';
import SalesList from './pages/SalesList.jsx';

function App() {
  return (
    // Damos un fondo base a toda la app
    <main className="h-screen w-screen overflow-y-auto bg-gray-50">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items" element={<ItemList />} />
        <Route path="/item/:id" element={<ItemDetail />} />
        <Route path="/sales" element={<SalesList />} />
        <Route path="*" element={<Home />} /> {/* Redirige al inicio */}
      </Routes>
    </main>
  );
}

export default App;