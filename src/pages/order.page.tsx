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
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-6xl mx-auto px-6 py-10">

        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/"
                className="text-sm text-zinc-500 hover:text-zinc-900 transition"
              >
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-sm font-semibold text-zinc-900">
                Meus Pedidos
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {!isLoading && orders?.map(order => (
          <div key={order.id} className="mb-6">
            <OrderContent order={order} />
          </div>
        ))}

      </div>
    </div>
  )
}