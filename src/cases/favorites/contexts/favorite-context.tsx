import {
  createContext,
  useContext,
  type ReactNode,
} from "react";

import type { FavoriteDTO } from "../dtos/favorite.dto";
import { useCreateFavorite, useFavorites } from "../hooks/use-favorite";

interface FavoritesContextProps {
  favorites: FavoriteDTO[] | undefined;
  isLoading: boolean;
  createFavorite: (product: any) => void;
  isFavorite: (productId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextProps>(
  {} as FavoritesContextProps
);

export function FavoritesProvider({
  children,
  customerId,
}: {
  children: ReactNode;
  customerId?: string;
}) {
  const { data, isLoading } = useFavorites(customerId);
  const createMutation = useCreateFavorite();

  function createFavorite(product: any) {
    const payload: Omit<FavoriteDTO, "id"> = {
      status: "NEW",

      product: product,

      items: [
        {
          product: product,
          quantity: 1,
          value: product.price,
        },
      ],
    };

    createMutation.mutate(payload);
  }

  function isFavorite(productId: string) {
    if (!data) return false;

    return data.some((fav) =>
      fav.items.some((item) => item.product.id === productId)
    );
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites: data,
        isLoading,
        createFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavoritesContext() {
  return useContext(FavoritesContext);
}
