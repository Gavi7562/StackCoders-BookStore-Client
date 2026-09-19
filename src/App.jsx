import { BrowserRouter as Router, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { AdminProvider } from './context/AdminContext';
import { CategoryProvider } from './context/CategoryContext';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Cart from './pages/Cart/Cart';
import Orders from './pages/Orders/Orders';
import OrderConfirmation from './pages/OrderConfirmation/OrderConfirmation';
import Login from './components/Auth/Login/Login';
import Signup from './components/Auth/Signup/Signup';
import AdminLogin from './pages/Admin/Login/AdminLogin';
import AdminLayout from './layouts/AdminLayout/AdminLayout';
import AdminDashboard from './pages/Admin/Dashboard/AdminDashboard';
import Products from './pages/Admin/Products/Products';
import UserManagement from './pages/Admin/Users/UserManagement';
import BusinessAnalytics from './pages/Admin/Analytics/BusinessAnalytics';
import AdminProtectedRoute from './components/AdminProtectedRoute/AdminProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/index.css';


const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;

  
};

const StoreLayout = () => (
  <div className="app">
    <Navbar />
    <Outlet />
    <Footer />
  </div>
);

const App = () => {
  return (
    <AuthProvider>
      <AdminProvider>
        <CartProvider>
          <CategoryProvider>
            <ProductProvider>
              <Router>
                <ScrollToTop />
                <ToastContainer position="top-right" autoClose={3000} />
                <Routes>
                  {/* Admin Routes */}
                  <Route path="/admin" element={<AdminLogin />} />
                  <Route element={<AdminProtectedRoute />}>
                    <Route path="/admin" element={<AdminLayout />}>
                      <Route path="dashboard" element={<AdminDashboard />} />
                      <Route path="products" element={<Products />} />
                      <Route path="users" element={<UserManagement />} />
                      <Route path="analytics" element={<BusinessAnalytics />} />
                    </Route>
                  </Route>

                  {/* Store Routes */}
                  <Route element={<StoreLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route element={<ProtectedRoute />}>
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/orders" element={<Orders />} />
                      <Route path="/order-confirmation" element={<OrderConfirmation />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                  </Route>
                </Routes>
              </Router>
            </ProductProvider>
          </CategoryProvider>
        </CartProvider>
      </AdminProvider>
    </AuthProvider>
  );
};

export default App;
