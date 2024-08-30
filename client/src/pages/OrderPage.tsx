import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetOrder,
  usePayOrder,
  useGetPaypalClientId,
  useDeliverOrder,
} from "../features/orders";
import { toast } from "react-toastify";
import { CartItemType, ERoutes } from "../types";
import { useAuthContext } from "../hooks";
import { formatCurrency } from "../utils";
import {
  usePayPalScriptReducer,
  PayPalButtons,
  PayPalButtonsComponentProps,
  SCRIPT_LOADING_STATE,
  ReactPayPalScriptOptions,
} from "@paypal/react-paypal-js";
import Loader from "../components/Loader";
import Button from "../components/Button";
import ShippingItem from "../components/ShippingItem";

export default function OrderPage() {
  const { id: orderId } = useParams();
  const { data: order, isLoading, refetch } = useGetOrder(orderId!);
  const { mutateAsync: payOrderAction } = usePayOrder();
  const { mutateAsync: deliverOrderAction } = useDeliverOrder();
  // console.log(order);

  const authContext = useAuthContext();
  const loggedInUser = authContext?.state.authUser;
  const navigate = useNavigate();

  // PayPal
  const { data: paypalClient } = useGetPaypalClientId();
  const [{ isPending, isRejected }, paypalDispatch] = usePayPalScriptReducer();

  useEffect(() => {
    if (paypalClient && paypalClient.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypalClient!.clientId,
            currency: "EUR",
          } as unknown as ReactPayPalScriptOptions,
        });
        paypalDispatch({
          type: "setLoadingStatus",
          value: SCRIPT_LOADING_STATE.PENDING,
        });
      };
      loadPaypalScript();
    }
  }, [paypalClient, paypalDispatch]);

  const paypalbuttonTransactionProps: PayPalButtonsComponentProps = {
    style: { layout: "vertical" },
    async createOrder(_data, actions) {
      const orderID = await actions.order.create({
        purchase_units: [{ amount: { value: order!.totalPrice.toString() } }],
      });
      return orderID;
    },
    async onApprove(_data, actions) {
      const details = await actions.order!.capture();
      try {
        await payOrderAction({ orderId: orderId!, ...details });
        refetch();
        toast.warning("Order successfully paid by PayPal");
      } catch (err: unknown) {
        if (err instanceof Error) {
          toast.error(err.message);
        } else {
          toast.error("An unknown error occurred");
        }
      }
    },
    onError(err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unknown error occurred");
      }
    },
  };

  async function handleTestPayment() {
    try {
      await payOrderAction({ orderId: orderId! });
      refetch();
      toast.success("Test payment successfull");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
      toast.error("An unknown error occurred");
    }
  }

  async function handleOrderDelivery() {
    try {
      await deliverOrderAction(orderId!);
      refetch();
      toast.success("Order is deliverd");
      const timer = setTimeout(() => {
        navigate(`${ERoutes.home}`);
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
      toast.error("An unknown error occurred");
    }
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="order section ">
      <h2 className="section__title">
        <span>Order</span>
      </h2>
      <div className="order__wrapper">
        <div className="shipping__data">
          <div className="shipping__data-card">
            <h4 className="card__title">shipping</h4>
            <article className="card__data">
              <p>name: {order!.shippingAddress.fullName}</p>
              <p>address: {order!.shippingAddress.address}</p>
              <p>postal code: {order!.shippingAddress.postalCode}</p>
              <p>city: {order!.shippingAddress.city}</p>
              <p>country: {order!.shippingAddress.country}</p>
            </article>
            {order!.isDelivered ? (
              <span>delivered at: {order!.deliveredAt}</span>
            ) : (
              <span>Not delivered</span>
            )}
          </div>

          <div className="shipping__data-card">
            <h4 className="card__title">Items</h4>
            <ul className="shipping__items">
              {order?.orderItems.map((item: CartItemType) => {
                return <ShippingItem key={item._id} item={item} />;
              })}
            </ul>
          </div>
        </div>
        <div className="summary__data">
          <div className="summary__data-card">
            <h4 className="card__title">order summary</h4>
            <ul className="summary__items">
              <li className="summary__item">
                <p>items</p>
                <span>{formatCurrency(order!.itemsPrice)}</span>
              </li>
              <li className="summary__item">
                <p>shipping</p>
                <span>{formatCurrency(order!.shippingPrice)}</span>
              </li>
              <li className="summary__item">
                <p>tax</p>
                <span>{formatCurrency(order!.taxPrice)}</span>
              </li>
              <li className="summary__item">
                <p>total</p>
                <span>{formatCurrency(order!.totalPrice)}</span>
              </li>
              {!order?.isPaid && (
                <li className="summary__item">
                  {isPending ? (
                    <Loader />
                  ) : isRejected ? (
                    toast.error("Error connecting PayPal")
                  ) : (
                    <div>
                      <PayPalButtons {...paypalbuttonTransactionProps} />
                      <Button
                        onClick={handleTestPayment}
                        type="button"
                        className="button button--mid"
                      >
                        Pay
                      </Button>
                    </div>
                  )}
                </li>
              )}
              {loggedInUser && order?.isPaid && !order.isDelivered && (
                <li className="summary__item">
                  <div>
                    <Button
                      onClick={handleOrderDelivery}
                      type="button"
                      className="button button--mid"
                    >
                      deliver order
                    </Button>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
