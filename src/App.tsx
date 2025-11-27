import { Routes, Route } from "react-router-dom";

import { SearchProvider } from "./contexts/search-context";
import { ProductListPage } from "./pages/product-list.page";
import { ProductDetailPage } from "./pages/product-detail.page";
import { CartPage } from "./pages/cart.page";
import { Header } from "./components/layout/header";
import { SignInPage } from "./pages/signin-page";
import { SignUpPage } from "./pages/signup-page";
import { CartContextProvider } from "./cases/cart/contexts/cart-context";
import { OrderProvider } from "./cases/orders/contexts/order-context";
import { OrdersPage } from "./pages/order.page";

function App() {
  return (
    <CartContextProvider>
      <OrderProvider> 
        <SearchProvider>
          <>
            <Header />
            <main className="min-h-screen bg-[#1A1A1A]">
              <div className="container mx-auto flex flex-col p-4 gap-4">
                <Routes>
                  <Route path="/" element={<ProductListPage />} />
                  <Route path="/category/:id" element={<ProductListPage />} />
                  <Route path="/product/:id" element={<ProductDetailPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/orders" element={<OrdersPage />} />
                  <Route path="/signin" element={<SignInPage />} />
                  <Route path="/signup" element={<SignUpPage />} />
                </Routes>
              </div>
            </main>
          </>
        </SearchProvider>
      </OrderProvider>
    </CartContextProvider>
  );
}

export default App;
