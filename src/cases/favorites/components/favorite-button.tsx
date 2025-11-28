import { useFavoritesContext } from "../contexts/favorite-context";



export function FavoriteList() {
  const { favorites, isLoading } = useFavoritesContext();

  if (isLoading) {
    return <p className="text-gray-600">Carregando favoritos...</p>;
  }

  if (!favorites || favorites.length === 0) {
    return <p className="text-gray-600">Nenhum favorito encontrado.</p>;
  }

  return (
    <div className="space-y-4">
      {favorites.map((fav) => (
        <div
          key={fav.id}
          className="border rounded-lg p-4 shadow-sm bg-white"
        >
          <p className="font-semibold">
            Favorito #{fav.id ?? "—"}
          </p>
          <p className="text-sm text-gray-600">
            Itens: {fav.items?.length ?? 0}
          </p>
          <p className="text-sm text-gray-600">
            Status: {fav.status}
          </p>
        </div>
      ))}
    </div>
  );
}
