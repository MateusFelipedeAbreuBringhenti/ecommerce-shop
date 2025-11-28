
import type { OrderDTO } from "../dtos/order.dto";

interface OrderCardProps {
  order: OrderDTO;
}

export const OrderCard = ({ order }: OrderCardProps) => {
  return (
    <div className="border p-4 rounded-md shadow-md mb-4">
      <h3 className="font-bold mb-2">Pedido: {order.id}</h3>
      <p>Status: {order.status}</p>
      <p>Total: R$ {order.total?.toFixed(2)}</p>
      <p>Itens: {order.items?.length ?? 0}</p>
      <p>Data: {order.createdAt ? new Date(order.createdAt).toLocaleString() : "-"}</p>
    </div>
  );
};