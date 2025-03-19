import { CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/Footer/footer';
import Header from './components/Header/header';
import Hero from './components/Hero/hero';
import { CartProvider } from './contexts/cartProducts/cartProducts';
import CartPage from './pages/Cart/cartPage';
import CouponsPage from './pages/Coupons/couponsPage';
import ProductsPage from './pages/Products/productsPage';
import { ThemeContextProvider } from './contexts/theme/provider/themeProvider';

const queryClient = new QueryClient();

function App() {
  return (
    <CartProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeContextProvider>


          <Router>
            <CssBaseline />
            <Header />
            <Hero />
            <Routes>
              <Route path="/" element={<ProductsPage />} />
              <Route path="/coupons" element={<CouponsPage />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
            <Footer />
          </Router>

        </ThemeContextProvider>
      </QueryClientProvider>
    </CartProvider>
  );
}

export default App;