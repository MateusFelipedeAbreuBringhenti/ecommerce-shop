import { useFavoritesContext } from "@/cases/favorites/contexts/favorite-context";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";


export function FavoritesPage() {
  const { favorites } = useFavoritesContext();

  return (
    <div className="min-h-screen  p-6">
      <h1 className="text-2xl font-semibold text-white mb-6">
        Meus Favoritos ❤️
      </h1>

      {favorites?.length === 0 ? (
        <p className="text-gray-400">Você ainda não favoritou nenhum produto.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favorites?.map((fav) => {
            const product = fav.product;
            const photo = product?.photos?.[0]?.url ?? "";
            const name = product?.name ?? "Produto";
            const price = product?.price ?? "—";

            return (
              <Link key={fav.id} to={`/product/${fav.product}`}>
                <Card className="bg-zinc-900 border-0 shadow-lg hover:scale-[1.02] transition rounded-xl">
                  <CardContent className="p-4 text-white flex flex-col items-center">
                    <img
                      src={photo}
                      className="w-full h-32 object-cover rounded-md mb-3"
                    />
                    <p className="text-sm font-semibold text-center">
                      {name}
                    </p>
                    <p className="text-red-400 text-sm">
                      {price} BRL
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
