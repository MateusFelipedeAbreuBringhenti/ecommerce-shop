import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FormattedNumber, IntlProvider } from "react-intl";
import { Button } from "@/components/ui/button";
import { useCart } from "@/cases/cart/hooks/use-cart";
import type { ProductDTO } from "../dtos/product.dto";
import { Link } from "react-router-dom";
import { Toggle } from "@/components/ui/toggle";
import { BookmarkIcon } from "lucide-react";
import { useFavoritesContext } from "@/cases/favorites/contexts/favorite-context";

type ProductCardProps = {
  product: ProductDTO;
};

export function ProductCard({ product }: ProductCardProps) {
  const { addProduct } = useCart();
  const bucketBaseURL = import.meta.env.VITE_BUCKET_BASE_URL;

  const { isFavorite, createFavorite } = useFavoritesContext(); // use createFavorite

  const [imagePath, setImagePath] = useState<string | null>(null);

  useEffect(() => {
    if (product.photos && product.photos.length > 0) {
      setImagePath(bucketBaseURL + product.photos[0].path);
    }
  }, [product]);

  function handleAddToCart() {
    addProduct(product, 1);
  }

  function handleToggleFavorite() {
    if (!product.id) return;

    // apenas adiciona se ainda não for favorito
    if (!isFavorite(product.id)) {
      createFavorite(product);
    } else {
      console.log("Remoção de favorito ainda não implementada");
    }
  }

  return (
    <Card className="relative flex flex-col justify-between bg-black rounded-xl border-0 shadow-[0_0_15px_rgba(0,0,0,0.7)]">

      <CardHeader className="py-0 h-[210px] flex items-center justify-center text-white overflow-hidden rounded-t-xl">
        <Link to={`/product/${product.id}`}>
          {imagePath ? (
            <img
              className="w-full h-full object-cover rounded-md"
              src={imagePath}
              alt={product.name}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">
              Sem imagem
            </div>
          )}
        </Link>
      </CardHeader>

      <Toggle
        aria-label="Toggle favorite"
        pressed={product.id ? isFavorite(product.id) : false}
        onPressedChange={handleToggleFavorite}
        size="sm"
        variant="outline"
        className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-white border-white
          data-[state=on]:text-red-500 data-[state=on]:border-red-500"
      >
        <BookmarkIcon className="h-4 w-4" />
      </Toggle>

      <CardContent>
        <Link to={`/product/${product.id}`}>
          <h4 className="text-sm font-semibold mb-4 min-h-10 text-white">
            {product.name}
          </h4>
        </Link>

        <div className="w-full flex flex-col">
          <p className="text-sm font-light text-red-400 line-through mb-1">
            <IntlProvider locale="pt-BR">
              <FormattedNumber
                value={product.price * 1.15}
                style="currency"
                currency="BRL"
              />
            </IntlProvider>
          </p>

          <p className="text-gray-300">
            <span className="font-semibold text-white">
              <IntlProvider locale="pt-BR">
                <FormattedNumber value={product.price} style="currency" currency="BRL" />
              </IntlProvider>
            </span>{" "}
            em 10x de{" "}
            <span className="font-semibold text-white">
              <IntlProvider locale="pt-BR">
                <FormattedNumber value={product.price / 10} style="currency" currency="BRL" />
              </IntlProvider>
            </span>
          </p>

          <p className="text-green-500 font-semibold">
            ou{" "}
            <IntlProvider locale="pt-BR">
              <FormattedNumber value={product.price * 0.9} style="currency" currency="BRL" />
            </IntlProvider>{" "}
            no PIX
          </p>
        </div>

        <div className="mt-3">
          <Button
            className="w-full bg-zinc-900 text-white hover:bg-black"
            onClick={handleAddToCart}
          >
            Adicionar ao carrinho
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
