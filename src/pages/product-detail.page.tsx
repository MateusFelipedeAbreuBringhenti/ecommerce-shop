import { useParams } from "react-router-dom";
import { useProduct } from "@/cases/products/hooks/use-product";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ProductDetail } from "@/cases/products/components/product-detail";
import { useCart } from "@/cases/cart/hooks/use-cart";

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { addProduct } = useCart();


  if (!id) {
    return <div className="p-6 text-white">Produto inválido.</div>;
  }

  const { data: product, isLoading, error } = useProduct(id);

  if (isLoading) {
    return <div className="p-6 text-white">Carregando produto...</div>;
  }

  if (error || !product) {
    return <div className="p-6 text-white">Produto não encontrado.</div>;
  }

  return (
    <div className="p-4 bg-[#1A1A1A] min-h-screen text-white">
      
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="text-gray-300 hover:text-white">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator className="text-gray-500" />

          <BreadcrumbItem>
            <BreadcrumbLink
              href={`/products?categoryId=${product.category?.id}`}
              className="text-gray-300 hover:text-white"
            >
              {product.category?.name}
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator className="text-gray-500" />

          <BreadcrumbItem>
            <BreadcrumbPage className="text-white">
              {product.name}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mt-8 flex flex-col md:flex-row gap-10 bg-[#1A1A1A] p-6 rounded-2xl shadow-xl">
        
        <div className="md:w-1/2 flex items-center justify-center rounded-xl p-4 shadow-lg">
          <ProductDetail product={product} />
        </div>

        <div className="md:w-1/2 flex flex-col gap-5">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-gray-400 leading-relaxed">
            {product.description ?? "Sem descrição disponível."}
          </p>

          <div className="text-3xl font-bold text-zinc-100 drop-shadow-sm flex items-center gap-2">
            <span className="tracking-tight">
              R${" "}
              {product.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>

          <div className="flex flex-col gap-3">

            <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-3 shadow-md">
              <p className="text-gray-300 text-sm">Em até</p>
              <p className="text-lg font-semibold text-white leading-tight">
                10x de{" "}
                {(product.price / 10).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
              <p className="text-xs text-gray-500 mt-1">Sem juros no cartão</p>
            </div>

            <div className="bg-green-600/15 border border-green-500/40 rounded-xl p-3 shadow-md">
              <p className="text-gray-300 text-sm">Ou com desconto no PIX</p>
              <p className="text-xl font-bold text-green-400 leading-tight">
                {(product.price * 0.9).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
              <p className="text-xs text-green-500 mt-1 font-medium">
                Economia de{" "}
                {(product.price - product.price * 0.9).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            </div>

          </div>

          <button
            onClick={() => addProduct(product, 1)}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl text-sm font-bold shadow-lg transition"
          >
            Adicionar ao Carrinho
          </button>

        </div>
      </div>
    </div>
  );
}
