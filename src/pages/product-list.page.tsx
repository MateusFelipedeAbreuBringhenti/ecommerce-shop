import { CategoryMenu } from "@/cases/categories/components/category-menu";
import { ProductCard } from "@/cases/products/components/product-card";
import { useProducts } from "@/cases/products/hooks/use-product";
import { useSearch } from "@/contexts/search-context";
import { useParams } from "react-router-dom";

export function ProductListPage() {
  const { data: products, isLoading } = useProducts();
  const { query } = useSearch();
  const { id: categoryId } = useParams<{ id: string }>();

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 text-center">
        Carregando produtos...
      </div>
    );
  }

  const filteredProducts = products
    ?.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      (p.description?.toLowerCase() ?? "").includes(query.toLowerCase())
    )
    .filter((p) => (categoryId ? String(p.category?.id) === String(categoryId) : true));

  return (
    <>
      <CategoryMenu />

      <section className="container mx-auto py-10">
        <div className="
              grid 
              grid-cols-2 
              sm:grid-cols-2 
              md:grid-cols-3 
              lg:grid-cols-4 s
              xl:grid-cols-5 
              2xl:grid-cols-6
              gap-6
            ">

          {filteredProducts && filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
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