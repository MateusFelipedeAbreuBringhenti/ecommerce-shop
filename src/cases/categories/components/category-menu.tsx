import { Button } from "@/components/ui/button";
import { useCategories } from "../hooks/use-category";
import { useEffect, useState } from "react";
import type { CategoryDTO } from "../dtos/category.dto";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function CategoryMenu() {
  const { data: categories, isLoading } = useCategories();
  const navigate = useNavigate();

  const [visibleItems, setVisibleItems] = useState<CategoryDTO[]>([]);
  const [hiddenItems, setHiddenItems] = useState<CategoryDTO[]>([]);

  useEffect(() => {
    if (categories) {
      setVisibleItems(categories.slice(0, 6));
      setHiddenItems(categories.slice(6));
    }
  }, [categories]);

  if (isLoading) {
    return (
      <nav className="w-full py-4 flex items-center justify-between bg-black">
        <p className="pl-16 text-sm text-white">Carregando categorias...</p>
      </nav>
    );
  }

  return (
    <nav className="w-full py-4 flex items-center justify-between">
      <div className="flex flex-col pl-16">
        <h5 className="font-medium text-2x1 text-red-600">Bateu a vontade? </h5>
        <p className="text-sm text-gray-500">O sabor que alimenta momentos</p>
      </div>

      <div className="flex items-center justify-end gap-2">

        {/* Botão 'Todos' */}
        <Button
          className="bg-black text-white hover:bg-zinc-900 border border-zinc-700 shadow-md"
          onClick={() => navigate("/")}
        >
          Todos
        </Button>

        {/* Categorias visíveis */}
        {visibleItems.map((category) => (
          <Button
            key={category.id}
            className="bg-black text-white hover:bg-zinc-900 border border-zinc-700 shadow-md"
            onClick={() => navigate(`/category/${category.id}`)}
          >
            {category.name}
          </Button>
        ))}

        {/* Dropdown das categorias escondidas */}
        {hiddenItems.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-black text-white hover:bg-zinc-900 border border-zinc-700 shadow-md">
                Mais
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="bg-zinc-900 text-white border border-zinc-700">
              {hiddenItems.map((category) => (
                <DropdownMenuItem
                  key={category.id}
                  onClick={() => navigate(`/category/${category.id}`)}
                  className="hover:bg-zinc-800"
                >
                  {category.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}

      </div>
    </nav>
  );
}
