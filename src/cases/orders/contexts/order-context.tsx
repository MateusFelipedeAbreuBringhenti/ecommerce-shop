import { createContext, useState, useEffect, type ReactNode } from "react";
import type { CartItem } from "@/cases/cart/contexts/cart-context";

interface Order {
  id: string;
  items: CartItem[];
  total: number;
  shipping: number;
  date: string;
}

interface OrderContextType {
  orders: Order[];
  createOrder: (items: CartItem[], total: number, shipping: number) => void;
}

export const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const storaged = localStorage.getItem("orders");
    if (storaged) setOrders(JSON.parse(storaged));
  }, []);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  function createOrder(items: CartItem[], total: number, shipping: number) {
    const newOrder: Order = {
      id: Date.now().toString(),
      items,
      total,
      shipping,
      date: new Date().toISOString()
    };
    setOrders((prev) => [...prev, newOrder]);
  }

  return (
    <OrderContext.Provider value={{ orders, createOrder }}>
      {children}
    </OrderContext.Provider>
  );
}