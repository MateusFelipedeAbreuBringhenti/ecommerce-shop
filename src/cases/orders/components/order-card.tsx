import type { OrderDTO } from "../dtos/order.dto";
import { OrderStatusBadge } from "./order-status-badge";
import { IntlProvider, FormattedNumber } from "react-intl";

interface OrderCardProps {
  order: OrderDTO;
}

export const OrderCard = ({ order }: OrderCardProps) => {
  return (
    <div className="bg-[#0D0D0D] border border-zinc-800 p-5 rounded-xl shadow-lg text-white space-y-2">

      <h3 className="text-xl font-bold text-white">
        Pedido #{order.id}
      </h3>

      <div className="flex items-center gap-2">
        <span className="text-zinc-400">Status:</span>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="flex justify-between text-zinc-300">
        <span>Total:</span>
        <span className="text-green-500 font-bold">
          <IntlProvider locale="pt-BR">
            <FormattedNumber
              value={order.total ?? 0}
              style="currency"
              currency="BRL"
            />
          </IntlProvider>
        </span>
      </div>

      <div className="flex justify-between text-zinc-300">
        <span>Itens:</span>
        <span className="font-semibold">{order.items?.length ?? 0}</span>
      </div>

      <div className="flex justify-between text-zinc-300">
        <span>Data:</span>
        <span className="font-semibold">
          {order.createdAt
            ? new Date(order.createdAt).toLocaleDateString("pt-BR")
            : "-"}
        </span>
      </div>
    </div>
  );
};
