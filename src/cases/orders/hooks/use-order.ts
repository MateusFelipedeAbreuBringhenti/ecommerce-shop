import { useContext } from "react";
import { OrderContext } from "../contexts/order-context";

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrders deve ser usado dentro de OrderProvider");
  return context;
}