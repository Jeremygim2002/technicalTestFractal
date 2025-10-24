import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import MyOrders from './pages/MyOrders';
import OrderFormPage from './pages/OrderFormPage';
import Products from './pages/Products';
import { Button } from './components/ui/button';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">

        <nav className="bg-white border-b">
          <div className="container mx-auto px-4 py-3 flex gap-4">
            <Link to="/my-orders">
              <Button variant="ghost">Mis Ordenes</Button>
            </Link>
            <Link to="/products">
              <Button variant="ghost">Productos</Button>
            </Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to="/my-orders" replace />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/add-order" element={<OrderFormPage />} />
          <Route path="/add-order/:id" element={<OrderFormPage />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;