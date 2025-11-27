import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/use-cart";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ItemGroup } from "@/components/ui/item";
import { QuantityInput } from "@/components/ui/quantity-input";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group";
import { MapPin, Trash2 } from "lucide-react";
import { FormattedNumber, IntlProvider } from "react-intl";
import { useOrders } from "@/cases/orders/hooks/use-order";

export function CartContent() {
  const { cart, removeProductCart, updateProductQuantity, clearCart } = useCart();
  const { createOrder } = useOrders();
  const navigate = useNavigate();
  const [shippingError, setShippingError] = useState("");
  const [dataCep, setDataCep] = useState<any>(null);


  const bucketBaseURL = import.meta.env.VITE_BUCKET_BASE_URL;

  const [cep, setCep] = useState("");
  const [shippingCost, setShippingCost] = useState(0);

  const productsTotal = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const totalCard = productsTotal + shippingCost;
  const totalPix = totalCard * 0.9;

async function calcularFrete() {
  if (cep.length !== 8) {
    alert("Digite um CEP válido.");
    return;
  }

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    if (data.erro) {
      alert("CEP não encontrado.");
      setDataCep(null);
      return;
    }

    setDataCep(data); 
    setShippingCost(cep.startsWith("85") ? 15 : 25);

  } catch (err) {
    alert("Erro ao buscar CEP. Tente novamente.");
  }
}


  function handleFinalizeOrder() {
    if (cart.items.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }
    if (!cep || shippingCost === 0) {
      alert("Por favor, calcule o frete antes de finalizar o pedido.");
      return;
    }

    createOrder(cart.items, totalCard, shippingCost);
    clearCart();
    navigate("/orders");
  }

  return (
    <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2 bg-black shadow-md rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white">Produtos</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <ItemGroup className="flex flex-col gap-4 text-white">
            {cart.items.map((item) => {
              const subtotal = item.product.price * item.quantity;

              return (
                <div
                  key={item.product.id}
                  className="flex items-center justify-between p-4 bg-zinc-900 rounded-xl shadow-sm"
                >
                  <div className="flex items-start gap-4 flex-1">
                    {item.product?.photos?.[0] && (
                      <img
                        src={`${bucketBaseURL}${item.product.photos[0].path}`}
                        className="w-20 h-20 object-cover rounded-lg shadow"
                        alt={item.product.name}
                      />
                    )}

                    <div className="flex flex-col">
                      <span className="text-base font-semibold line-clamp-1">{item.product.name}</span>
                      {item.product.brand && (
                        <span className="text-xs text-muted-foreground">{item.product.brand.name}</span>
                      )}
                      <span className="mt-2 text-sm font-semibold text-red-600">
                        <IntlProvider locale="pt-BR">
                          <FormattedNumber value={item.product.price} style="currency" currency="BRL" />
                        </IntlProvider>{" "}
                        <span className="text-xs text-gray-500">unidade</span>
                      </span>
                      <span className="mt-1 text-sm font-bold text-zinc-100">
                        <IntlProvider locale="pt-BR">
                          <FormattedNumber value={subtotal} style="currency" currency="BRL" />
                        </IntlProvider>{" "}
                        <span className="text-xs text-muted-foreground">(subtotal)</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center text-black  gap-3">
                    <QuantityInput
                      initialQuantity={item.quantity}
                      onChange={(value) => updateProductQuantity(item.product.id!, value)}
                    />

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => removeProductCart(item.product.id!)}
                          className="p-2 rounded-md hover:bg-red-300 transition"
                        >
                          <Trash2 className="text-red-600" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>Remover item</TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              );
            })}
          </ItemGroup>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-6">
        <Card className="bg-black text-white shadow-md rounded-2xl">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Calcular Frete</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <InputGroup>
              <InputGroupInput
                placeholder="Digite seu CEP"
                value={cep}
                onChange={(e) => setCep(e.target.value.replace(/\D/g, ""))}
              />
              <InputGroupAddon>
                <MapPin className="text-red-500" />
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">
                <Button variant="ghost" size="sm" className="hover:text-red-600" onClick={calcularFrete}>
                  Calcular
                </Button>
              </InputGroupAddon>
            </InputGroup>

            {shippingCost > 0 && (
              <div className="text-xs text-muted-foreground space-y-1">
                <p>
                  Frete calculado para o CEP <span className="font-semibold">{cep}</span>
                </p>

                {dataCep && (
                  <div className="text-gray-400">
                    <p>{dataCep.logradouro}</p>
                    <p>{dataCep.bairro}</p>
                    <p>{dataCep.localidade} - {dataCep.uf}</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-black text-white shadow-md rounded-2xl">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Resumo do Pedido</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Frete:</span>
              <strong>
                <IntlProvider locale="pt-BR">
                  <FormattedNumber value={shippingCost} style="currency" currency="BRL" />
                </IntlProvider>
              </strong>
            </div>

            <div className="flex justify-between text-sm">
              <span>Produtos:</span>
              <strong>
                <IntlProvider locale="pt-BR">
                  <FormattedNumber value={productsTotal} style="currency" currency="BRL" />
                </IntlProvider>
              </strong>
            </div>

            <div className="pt-2 border-t">
              <div className="flex justify-between text-sm font-semibold">
                <span>Total no PIX:</span>
                <span className="text-green-600">
                  <IntlProvider locale="pt-BR">
                    <FormattedNumber value={totalPix} style="currency" currency="BRL" />
                  </IntlProvider>
                </span>
              </div>

              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Total no Cartão:</span>
                <span>
                  <IntlProvider locale="pt-BR">
                    <FormattedNumber value={totalCard} style="currency" currency="BRL" />
                  </IntlProvider>
                </span>
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <Button
              className="w-full bg-red-600 hover:bg-red-700 text-white py-4 text-sm font-semibold"
              onClick={handleFinalizeOrder}
            >
              Finalizar Pedido
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}