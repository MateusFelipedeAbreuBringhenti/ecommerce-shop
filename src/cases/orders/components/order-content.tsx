import { Card } from "@/components/ui/card";
import type { OrderDTO } from "../dtos/order.dto";

import { IntlProvider, FormattedNumber } from "react-intl";
import { OrderStatusBadge } from "./order-status-badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";

type OrderContentProps = {
  order: OrderDTO;
};

export function OrderContent({ order }: OrderContentProps) {
  const [open, setOpen] = useState(false);

  return (
    <Card className="bg-white shadow-md rounded-2xl p-4 space-y-4">
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger asChild>
          <div className="flex justify-between items-center cursor-pointer">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-bold">Pedido #{order.id}</h2>
              <OrderStatusBadge status={order.status} />
            </div>
            <ChevronsUpDown
              className={`h-5 w-5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            />
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent className="overflow-hidden transition-all duration-300">
          <div className="grid grid-cols-1 gap-2 mt-4">
            {order.items.map((item) => (
              <div
                key={item.product.id}
                className="flex justify-between items-center p-2 bg-zinc-50 rounded-lg"
              >
                <div className="flex flex-col">
                  <span className="font-semibold">{item.product.name}</span>
                  {item.product.brand && (
                    <span className="text-xs text-muted-foreground">
                      {item.product.brand.name}
                    </span>
                  )}
                  <span className="text-xs text-gray-500">Qtd: {item.quantity}</span>
                </div>

                <span className="font-bold text-gray-700">
                  <IntlProvider locale="pt-BR">
                    <FormattedNumber
                      value={item.product.price * item.quantity}
                      style="currency"
                      currency="BRL"
                    />
                  </IntlProvider>
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-4 p-2 border-t font-bold text-gray-800">
            <span>Total do Pedido:</span>
            <IntlProvider locale="pt-BR">
              <FormattedNumber
                value={order.items.reduce(
                  (acc, item) => acc + item.product.price * item.quantity,
                  0
                )}
                style="currency"
                currency="BRL"
              />
            </IntlProvider>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}