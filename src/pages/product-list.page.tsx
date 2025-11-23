import { CategoryMenu } from "@/cases/categories/components/category-menu";
import { ProductCard } from "@/cases/products/components/product-card";
import { useProducts } from "@/cases/products/hooks/use-product";
import { Link } from "react-router-dom";

export function ProductListPage() {
  const { data: products, isLoading } = useProducts();

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 text-center">
        Carregando produtos...
      </div>
    );
  }

  return (
    <>
      <CategoryMenu />

      <section className="container mx-auto py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products && products.length > 0 ? (
            products.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`}>
                <ProductCard product={product} />
              </Link>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600">
              Nenhum produto encontrado.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
