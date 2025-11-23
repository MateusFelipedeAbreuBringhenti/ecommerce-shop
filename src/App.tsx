import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/cart-context";
import { ProductListPage } from "./pages/product-list.page";
import { CartPage } from "./pages/cart.page";
import { Header } from "./components/layout/header";

function App() {
  return (
    <CartProvider>
      <>
        <Header />

        <Routes>
          <Route path="/" element={<ProductListPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </>
    </CartProvider>
  );
}

export default App;
