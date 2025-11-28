import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Beef, Flame, User } from "lucide-react";
import { useSearch } from "@/contexts/search-context";
import { useCart } from "@/cases/cart/hooks/use-cart";
import { useAuth } from "@/cases/auth/hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

const buttonStyles =
  "bg-[#1A1A1A] text-white border border-zinc-700 hover:bg-black/80 " +
  "focus:outline-none focus:ring-0 focus:ring-transparent";

export function Header() {
  const { cart } = useCart();
  const { query, setQuery } = useSearch();
  const { user, isAuthenticated, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="w-full bg-black">
      <div className="container mx-auto flex flex-col gap-2 py-4">
        
        <div className="flex items-center justify-between gap-4">

          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-white"
          >
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

          <div className="flex items-center gap-4">

            <Link to="/cart" className="relative">
              <Button className={buttonStyles} size="icon">
                <Beef className="h-5 w-5" />
              </Button>

              {cart.items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1 flex items-center gap-1">
                  <Flame
                    className="w-3 h-3"
                    style={{
                      animation: "flameGlow 1.4s ease-in-out infinite",
                      filter: "drop-shadow(0 0 4px rgba(255,255,255,0.9))",
                    }}
                  />
                  {cart.items.length}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className={buttonStyles} size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  className="w-48 bg-zinc-900 text-white rounded-md shadow-md p-2"
                  align="end"
                >
                  <div className="px-3 py-2 text-sm border-b border-zinc-700 mb-2">
                    Olá, {user?.name}
                  </div>

                  <DropdownMenuItem
                    className="cursor-pointer px-3 py-2 hover:bg-zinc-800 rounded"
                    onClick={() => navigate("/orders")}
                  >
                    Meus Pedidos
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="cursor-pointer px-3 py-2 hover:bg-zinc-800 rounded"
                    onClick={() => navigate("/favorites")}
                  >
                    Favoritos
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="cursor-pointer px-3 py-2 hover:bg-red-600 rounded mt-2"
                    onClick={() => {
                      signOut();
                      navigate("/");
                    }}
                  >
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/signin">
                  <Button className={buttonStyles} size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>

                <Button
                  className={buttonStyles}
                  onClick={() => navigate("/signin")}
                >
                  Login
                </Button>
              </>
            )}

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
