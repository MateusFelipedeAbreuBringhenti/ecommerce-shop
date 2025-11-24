import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/cart-context";
import { SearchProvider } from "./contexts/search-context";
import { ProductListPage } from "./pages/product-list.page";
import { ProductDetailPage } from "./pages/product-detail.page";
import { CartPage } from "./pages/cart.page";
import { Header } from "./components/layout/header";
import { AuthProvider } from "./contexts/auth-context";
import { LoginPage } from "./pages/login.page";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
          <SearchProvider>
            <>
              <Header />

              <Routes>
                <Route path="/" element={<ProductListPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/category/:id" element={<ProductListPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/login" element={<LoginPage />} />
              </Routes>
            </>
          </SearchProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
