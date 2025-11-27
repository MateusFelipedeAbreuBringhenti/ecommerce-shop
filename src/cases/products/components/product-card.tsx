import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FormattedNumber, IntlProvider } from "react-intl";
import { Button } from "@/components/ui/button";
import { useCart } from "@/cases/cart/hooks/use-cart";
import type { ProductDTO } from "../dtos/product.dto";
import { Link } from "react-router-dom";

type ProductCardProps = {
  product: ProductDTO;
};

export function ProductCard({ product }: ProductCardProps) {
  const { addProduct } = useCart();
  const bucketBaseURL = import.meta.env.VITE_BUCKET_BASE_URL;

  const [imagePath, setImagePath] = useState<string | null>(null);

  useEffect(() => {
    if (product.photos && product.photos.length > 0) {
      setImagePath(bucketBaseURL + product.photos[0].path);
    }
  }, [product]);

  function handleAddToCart() {
    addProduct(product, 1);
  }

  return (
    <Card className="flex flex-col justify-between bg-black rounded-xl border-0 shadow-[0_0_15px_rgba(0,0,0,0.7)]">
      <CardHeader className="py-0 h-[210px] flex items-center justify-center  text-white overflow-hidden rounded-t-xl">
        <Link to={`/product/${product.id}`}>
          {imagePath ? (
            <img
              className="cover w-full h-full object-cover rounded-md"
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
            </span>
            {" "}em 10x de{" "}
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
            </IntlProvider>
            {" "}no PIX
          </p>

        </div>

        <div className="mt-3">
          <Button onClick={handleAddToCart} className="w-full bg-zinc-900 text-white hover:bg-black">
            Adicionar ao carrinho
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
