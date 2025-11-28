import { createContext, useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { OrderDTO } from "../dtos/order.dto";
import { AxiosError } from "axios";
import { OrderService } from "../services/order-service";

interface OrderContextType {
  orders: OrderDTO[];
  createOrder: (data: Omit<OrderDTO, "id">) => Promise<OrderDTO>;
  refetchOrders: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();

  const { data: orders = [], refetch } = useQuery<OrderDTO[], AxiosError>({
    queryKey: ["orders"],
    queryFn: () => OrderService.list(),
  });

  const { mutateAsync: createOrderMutate } = useMutation<OrderDTO, AxiosError, Omit<OrderDTO, "id">>({
    mutationFn: async (data) => {
      try {
        return await OrderService.create(data);
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          throw new Error(err.response?.data?.message || err.message);
        }
        throw new Error(err instanceof Error ? err.message : "Erro desconhecido");
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["orders"] }),
  });

  const createOrder = async (data: Omit<OrderDTO, "id">) => createOrderMutate(data);

  return (
    <OrderContext.Provider value={{ orders, createOrder, refetchOrders: refetch }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrder must be used within OrderProvider");
  return context;
};