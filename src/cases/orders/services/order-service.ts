import { api } from "../../../lib/axios";
import type { OrderDTO } from "../dtos/order.dto";


const _ENDPOINT = '/orders';

export const OrderService = {

    async list(customerId?: string): Promise<OrderDTO[]> {
    const result = await api.get(_ENDPOINT, {
        params: customerId ? { customerId } : undefined
    });
    return result.data;
},


    async create(order: OrderDTO): Promise<OrderDTO> {
        const result = await api.post(_ENDPOINT, order);
        return result.data;
    }
}; 