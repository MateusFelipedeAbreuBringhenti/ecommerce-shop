import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "../dtos/order.dto";

type DataTableBadgeProps = {
    status: string | number;
}
export function OrderStatusBadge({
    status
}: DataTableBadgeProps) {
    const info = OrderStatus.find((s) => s.value === status)

    return (
        status ? (
            <Badge
                variant="outline"
                className={`${info?.bg} ${info?.border} ${info?.text}`}
            >
                {info?.label}
            </Badge>
        ) : (
            <p>Não Econtrado!</p>
        )
    )

}