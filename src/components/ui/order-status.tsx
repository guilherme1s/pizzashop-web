export type OrderStatus =
  | "pending"
  | "canceled"
  | "processing"
  | "delivering"
  | "delivered";

interface OrderStatusProps {
  status: OrderStatus;
}

const orderStatusMap: Record<OrderStatus, string> = {
  pending: "Pendente",
  canceled: "Cancelado",
  delivered: "Entregue",
  delivering: "Em entrega",
  processing: "Em preparo",
};

export function OrderStatus({ status }: OrderStatusProps) {
  return (
    <div className="flex items-center gap-2">
      {status === "pending" && (
        <span
          data-testid="badgePending"
          className="h-2 w-2 rounded-b-full bg-slate-400"
        />
      )}

      {status === "canceled" && (
        <span
          data-testid="badgeCanceled"
          className="h-2 w-2 rounded-b-full bg-rose-500"
        />
      )}

      {status === "delivered" && (
        <span
          data-testid="badgeDelivered"
          className="h-2 w-2 rounded-b-full bg-emerald-500"
        />
      )}

      {["processing", "delivering"].includes(status) && (
        <span
          data-testid="badgeDelivering"
          className="h-2 w-2 rounded-b-full bg-amber-500"
        />
      )}

      <span data-testid="badgeB" className="text-muted-foreground font-medium">
        {orderStatusMap[status]}
      </span>
    </div>
  );
}
