import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/cart-context";
import { SearchProvider } from "./contexts/search-context";
import { ProductListPage } from "./pages/product-list.page";
import { ProductDetailPage } from "./pages/product-detail.page";
import { CartPage } from "./pages/cart.page";
import { Header } from "./components/layout/header";
import { SignInPage } from "./pages/signin-page";
import { SignUpPage } from "./pages/signup-page";


function App() {
  return (
      <CartProvider>
      
      <SearchProvider>
        <>
          <Header />
          <main className="bg-zinc-50 min-h-screen">
            <div className="container mx-auto flex flex-col p-4 gap-4">
              <Routes>
                <Route path="/" element={<ProductListPage />} />
                <Route path="/category/:id" element={<ProductListPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/signup" element={<SignUpPage />} />
              </Routes>
            </div>
          </main>
        </>
      </SearchProvider>
    </CartProvider>
  );
}

export default App;
