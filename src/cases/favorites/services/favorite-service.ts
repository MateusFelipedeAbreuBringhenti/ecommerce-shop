import { api } from "../../../lib/axios";
import type { FavoriteDTO } from "../dtos/favorite.dto";

const _ENDPOINT = '/favorites';

export const FavoriteService = {

    async list(customerId?: string): Promise<FavoriteDTO[]> {
    const result = await api.get(_ENDPOINT, {
        params: customerId ? { customerId } : undefined
    });
    return result.data;
    },


    async create(favorite: FavoriteDTO): Promise<FavoriteDTO> {
        const result = await api.post(_ENDPOINT, favorite);
        return result.data;
    },

   async remove(favoriteId: string): Promise<void> {
    await api.delete(`${_ENDPOINT}/${favoriteId}`);
    },
};