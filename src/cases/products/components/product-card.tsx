import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { ProductDTO } from "../dtos/product.dto";
import { FormattedNumber, IntlProvider } from "react-intl";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";


type ProductCardProps = {
  product: ProductDTO;
};

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

function handleAddToCart() {
  
  const rawId =
    (product as any).id ?? (product as any)._id ?? (product as any).uuid;
  const id = rawId != null ? String(rawId) : `${product.name}-${Date.now()}`;

  const price = Number((product as any).price ?? 0);

  addToCart({
    id,
    name: product.name,
    price,
    image: (product as any).image ?? "",
    quantity: 1,
  });
}

  return (
    <Card>
      <CardHeader>
        { (product as any).image && (
          <img
            src={(product as any).image}
            alt={product.name}
            className="w-full h-48 object-cover rounded-md"
          />
        ) }
      </CardHeader>

      <CardContent>
        <h4>{product.name}</h4>

        <div className="w-full flex flex-col">
          <p>
            <IntlProvider locale="pt-BR">
              <FormattedNumber
                value={product.price}
                style="currency"
                currency="BRL"
              />{" "}
              Kg
            </IntlProvider>
          </p>

          <p>
            <IntlProvider locale="pt-BR">
              <FormattedNumber
                value={product.price}
                style="currency"
                currency="BRL"
              />{" "}
              em 10x de{" "}
              <FormattedNumber
                value={product.price / 10}
                style="currency"
                currency="BRL"
              />
            </IntlProvider>
          </p>

          <p>
            ou{" "}
            <IntlProvider locale="pt-BR">
              <FormattedNumber
                value={product.price * 0.9}
                style="currency"
                currency="BRL"
              />
            </IntlProvider>{" "}
            no PIX
          </p>
        </div>

        <div className="mt-3">
          <Button onClick={handleAddToCart} className="w-full">
            Adicionar ao carrinho
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}