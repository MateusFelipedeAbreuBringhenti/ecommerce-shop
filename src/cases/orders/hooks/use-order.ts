import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { OrderDTO } from "../dtos/order.dto";
import { OrderService } from "../services/order-service";


export function useOrders(customerId?: string) {
    return useQuery<OrderDTO[]>({
        queryKey: ['orders', customerId ?? 'all'],
        queryFn: () => OrderService.list(customerId),
    });
}
export function useCreateOrder() {
    const queryClient = useQueryClient();

    return useMutation<OrderDTO, Error, Omit<OrderDTO, 'id'>>({
        mutationFn: (order: Omit<OrderDTO, 'id'>) => OrderService.create(order),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        }
    });
}