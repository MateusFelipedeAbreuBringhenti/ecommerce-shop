import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Beef, Flame, User } from "lucide-react";
import { useSearch } from "@/contexts/search-context";
import { useCart } from "@/cases/cart/hooks/use-cart";
import { useAuth } from "@/cases/auth/hooks/use-auth";


export function Header() {
  const { cart } = useCart();
  const { query, setQuery } = useSearch();
  const { user } = useAuth(); 

  return (
    <header className="w-full bg-black">
      <div className="container mx-auto flex flex-col gap-2 py-4">
        
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white">
            <Beef className="w-7 h-7 text-red-600" />
            MeatHouse Shop
          </Link>

          <div>
            {user && (
            <span
              className="mt-2 text-2xl font-bold text-white animate-fadeIn"
              style={{
                fontFamily: "'Poppins', sans-serif",
                animation: "flameGlow 2s ease-in-out infinite",
                filter: "drop-shadow(0 0 4px rgba(255,255,255,0.9))",
              }}
            >
              Olá, {user.name}!
            </span>
          )}
          </div>

          <div className="flex items-center gap-4 ">
            <Link to="/cart" className="relative">
              <Button variant="default" size="icon">
                <Beef className="h-5 w-5" />
              </Button>

              {cart.items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1 flex items-center gap-1">
                  <Flame className="w-3 h-3"
                         style={{
                           animation: "flameGlow 1.4s ease-in-out infinite",
                           filter: "drop-shadow(0 0 4px rgba(255,255,255,0.9))",
                       }}
                  />
                  {cart.items.length}
                </span>
              )}
            </Link>

            <Link to="/SignIn">
              <Button
                variant="default"
                size="icon"
                className="bg-[#1A1A1A] text-white hover:bg-black/80"
              >
                <User className="h-5 w-5 text-white" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 mt-2">
          <Input
            type="text"
            placeholder="Buscar produtos..."
            className="w-full h-11 text-base"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
    </header>
  );
}
