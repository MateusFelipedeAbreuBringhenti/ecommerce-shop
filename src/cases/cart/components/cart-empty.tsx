import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Beef } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function CartEmpty() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="max-w-2xl bg-[#1A1A1A]">
        <CardContent className="flex flex-col justify-center items-center py-8 space-y-4">
          <div className="w-24 h-24 rounded-full border-4 border-red-500 flex justify-center items-center">
            <Beef className="w-12 h-12 text-red-500" />
          </div>

          <h3 className="text-center text-xl text-zinc-100 font-semibold">
            Seu carrinho está vazio!
          </h3>

          <p className="text-center text-lg text-zinc-100">
            Que tal adicionar alguns produtos?
          </p>
        </CardContent>

        <CardFooter className="flex justify-center py-8">
          <Button
            variant="outline"
            className="border-red-500 text-red-500 hover:border-red-700 hover:text-red-700"
            onClick={() => navigate("/")}
          >
            Página Inicial
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}