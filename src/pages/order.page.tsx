import { useAuth } from "@/cases/auth/hooks/use-auth";
import { OrderContent } from "@/cases/orders/components/order-content";
import { useOrders } from "@/cases/orders/hooks/use-order";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function OrdersPage() {
  const { user } = useAuth();
  const { data: orders, isLoading } = useOrders(user?.id);

  return (
    <div className="min-h-screen bg-[#1A1A1A]">
      <div className="max-w-6xl mx-auto px-6 py-10">


        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/"
                className="text-sm text-zinc-100 hover:text-zinc-400 transition"
              >
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-sm font-semibold text-zinc-100">
                Meus Pedidos
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {isLoading && (
          <p className="text-zinc-100 text-lg text-center py-20">
            Carregando pedidos...
          </p>
        )}

        {!isLoading && (!orders || orders.length === 0) && (
          <p className="text-zinc-100 text-lg text-center py-20">
            Você ainda não realizou nenhum pedido.
          </p>
        )}

        {!isLoading && orders && orders.map((order) => (
          <div key={order.id} className="mb-6">
            <OrderContent order={order} />
          </div>
        ))}

      </div>
    </div>
  );
}
