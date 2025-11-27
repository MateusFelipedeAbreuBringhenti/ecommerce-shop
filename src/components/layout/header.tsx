import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Beef, Flame, User } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { useSearch } from "@/contexts/search-context";

export function Header() {
  const { cartCount } = useCart();
  const { query, setQuery } = useSearch();

  return (
    <header className="w-full border-b bg-white">
      <div className="container mx-auto flex items-center justify-between py-4 gap-4">
        
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
            <Beef className="w-7 h-7 text-black" />
            MeatHouse Shop
          </Link>

        <div className="flex-1 px-10">
          <Input
            type="text"
            placeholder="Buscar produtos..."
            className="w-full h-11 text-base"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative">
            <Button variant="default" size="icon">
              <Beef className="h-5 w-5" />
            </Button>

            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1 flex items-center gap-1">
                <Flame className="w-3 h-3"
                        style={{
                          animation: "flameGlow 1.4s ease-in-out infinite",
                          filter: "drop-shadow(0 0 4px rgba(255,255,255,0.9))",
                      }}
                    />
                {cartCount}
              </span>
            )}
          </Link>

            <Link to="/SignIn">
              <Button
                variant="default"
                size="icon"
                className="bg-black text-white hover:bg-black/80"
              >
                <User className="h-5 w-5 text-white" />
              </Button>
            </Link>
        </div>
      </div>
    </header>
  );
}
