import { CartContent } from "@/cases/cart/components/cart-content";
import { CartEmpty } from "@/cases/cart/components/cart-empty";
import { useCart } from "@/cases/cart/hooks/use-cart";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function CartPage() {
  const { cart } = useCart();

  return (
    <div className="min-h-screen bg-[#1A1A1A]">
      <div className="max-w-6xl mx-auto px-6 py-10">

        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/"
                className="text-sm text-zinc-500 hover:text-white transition"
              >
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbPage className="text-sm font-semibold text-white">
                Meu Carrinho
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-4xl font-extrabold text-zinc-100 mb-8">
          Meu Carrinho
        </h1>

        <div className="bg-black rounded-3xl shadow-xl p-8">
          {cart.items.length > 0 ? (
            <CartContent />
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <CartEmpty />

            </div>
          )}
        </div>

      </div>
    </div>
  );
}
