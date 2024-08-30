import { useGetUserOrders } from "../features/orders";
import Loader from "../components/Loader";
import OrderItem from "../components/OrderItem";
import headerLogo from "@/assets/svgs/header-logo.svg";
import { Link } from "react-router-dom";
import { ERoutes } from "../types";

export default function UserOrders() {
  const { data: orders, isPending } = useGetUserOrders();

  return (
    <>
      <div className="nav__logo-page">
        <Link to={ERoutes.home}>
          <p>GanjaWebshop</p>
        </Link>
        <img src={headerLogo} alt="header logo svg icon" />
      </div>
      <section className="orders section">
        {orders?.length === 0 ? (
          <h2 className="section__title">no orders</h2>
        ) : (
          <>
            <h2 className="section__title">
              <span>user orders</span>
            </h2>
            {isPending ? (
              <Loader />
            ) : (
              <ul className="orders__list">
                {orders?.map((order) => {
                  return <OrderItem key={order._id} order={order} />;
                })}
              </ul>
            )}
          </>
        )}
      </section>
    </>
  );
}
