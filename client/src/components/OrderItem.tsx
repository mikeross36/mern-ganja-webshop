import { OrderType } from "../types";
import { formatDate } from "date-fns";
import headerLogo from "@/assets/svgs/header-logo.svg";
import { formatCurrency } from "../utils";
import { useNavigate } from "react-router-dom";
import { ERoutes } from "../types";
import Button from "./Button";

export default function OrderItem({ order }: { order: OrderType }) {
  const navigate = useNavigate();

  return (
    <li className="order__item">
      <img src={headerLogo} alt="header logo svg icon" width={32} />
      <p>order id: {order._id}</p>
      <p>created: {formatDate(order?.createdAt, "yyyy.MM.dd")}</p>
      <p>total price: {formatCurrency(order.totalPrice)}</p>
      <p>
        order paid:{" "}
        {order.isPaid && order.paidAt
          ? formatDate(order?.paidAt, "yyyy.MM.dd")
          : "NO"}
      </p>
      <p>
        order deliverd:{" "}
        {order.isDelivered ? formatDate(order.deliveredAt, "yyyy.MM.dd") : "NO"}
      </p>
      <Button
        onClick={() => navigate(`${ERoutes.order}/${order._id}`)}
        type="button"
        className="button button--small"
      >
        details
      </Button>
    </li>
  );
}
