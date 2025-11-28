import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { FavoriteDTO } from "../dtos/favorite.dto";
import { FavoriteService } from "../services/favorite-service";


export function useFavorites(customerId?: string) {
    return useQuery<FavoriteDTO[]>({
        queryKey: ['favorites', customerId ?? 'all'],
        queryFn: () => FavoriteService.list(customerId),
    });
}
export function useCreateFavorite() {
    const queryClient = useQueryClient();

    return useMutation<FavoriteDTO, Error, Omit<FavoriteDTO, 'id'>>({
        mutationFn: (favorite: Omit<FavoriteDTO, 'id'>) => FavoriteService.create(favorite),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['favorites'] });
        }
    });
}