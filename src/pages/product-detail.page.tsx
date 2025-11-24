import { useParams } from "react-router-dom";
import { useProduct } from "@/cases/products/hooks/use-product";
import { useCart } from "@/contexts/cart-context";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ProductDetail } from "@/cases/products/components/product-detail";
import { Button } from "@/components/ui/button";
import { FormattedNumber, IntlProvider } from "react-intl";

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const cart = useCart();

  if (!id) {
    return <div className="p-6">Produto inválido.</div>;
  }

  const { data: product, isLoading, error } = useProduct(id);
  
  if (isLoading) {
    return <div className="p-6">Carregando produto...</div>;
  }

  if (error || !product) {
    return <div className="p-6">Produto não encontrado.</div>;
  }

   function handleAddToCart() {
    if (!product || !product.id) return;
    cart.addToCart({
      id : product.id,
      name: product.name,
      price: product.price,
      image: (product as any).image ?? "",
      quantity: 1,
    });
  }

  return (
    <div className="p-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbLink href={`/products?categoryId=${product.category?.id}`}>
              {product.category?.name}
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="p-8">
        <ProductDetail product={product} />
      </div>
      <div className="container mx-auto py-10 flex flex-col md:flex-row gap-10">

      <div className="md:w-1/2 flex flex-col gap-4">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-gray-700">{product.description}</p>

        <div className="text-xl font-semibold">
          <IntlProvider locale="pt-BR">
            <FormattedNumber value={product.price} style="currency" currency="BRL" />
          </IntlProvider>
        </div>

        <Button onClick={handleAddToCart} className="mt-4 w-40">
          Adicionar ao Carrinho
        </Button>
      </div>
    </div>
    </div>

  );
}