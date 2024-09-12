import {
  useAppSelector,
  useAppContext,
  useShoppingCartDispatch,
} from "../hooks";
import { ShoppingCartStateType } from "../shopping-cart-state/reducers";
import { Link, useNavigate } from "react-router-dom";
import { CartItemType, ERoutes, OrderType } from "../types";
import { formatCurrency } from "../utils";
import { useCreateOrder } from "../features/orders";
import { clearShoppingCartAction } from "../shopping-cart-state/actions";
import Checkout from "../components/Checkout";
import ShippingItem from "../components/ShippingItem";
import Button from "../components/Button";
import { ShoppingCartActionType } from "../shopping-cart-state/action-types";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function MakeOrder() {
  const {
    shippingAddress,
    paymentMethod,
    cartItems,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = useAppSelector((state) => state.shoppingCart as ShoppingCartStateType);
  const { setIsCartOpen } = useAppContext();
  const { mutateAsync: createOrderAction, isPending } = useCreateOrder();

  const dispatch = useShoppingCartDispatch();
  const navigate = useNavigate();

  async function handleMakeOrder() {
    try {
      const data = await createOrderAction({
        orderItems: cartItems,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        itemsPrice: +itemsPrice.toFixed(2),
        shippingPrice: +shippingPrice.toFixed(2),
        taxPrice: +taxPrice.toFixed(2),
        totalPrice: +totalPrice.toFixed(2),
      });
      dispatch(clearShoppingCartAction() as unknown as ShoppingCartActionType);
      // console.log(data);
      navigate(`${ERoutes.order}/${data.order._id}`) as unknown as OrderType;
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  }

  useEffect(() => {
    if (!paymentMethod) navigate(ERoutes.payment);
  }, [paymentMethod, navigate]);

  return (
    <>
      <Checkout step1 step2 step3 step4 />
      <section className="make__order section container">
        <h2 className="section__title">
          <span>order preview</span>
        </h2>
        <div className="make__order-wrapper">
          <div className="shipping__data">
            <div className="shipping__data-card">
              <h4 className="card__title">shipping</h4>
              <article className="card__data">
                <p>name: {shippingAddress.fullName}</p>
                <p>address: {shippingAddress.address}</p>
                <p>postal code: {shippingAddress.postalCode}</p>
                <p>city: {shippingAddress.city}</p>
                <p>country: {shippingAddress.country}</p>
                <Link to={ERoutes.shipping}>edit</Link>
              </article>
            </div>

            <div className="shipping__data-card">
              <h4 className="card__title">payment</h4>
              <article className="card__data">
                <p>payment method: {paymentMethod}</p>
                <Link to={ERoutes.payment}>edit</Link>
              </article>
            </div>

            <div className="shipping__data-card">
              <h4 className="card__title">shipping items</h4>
              <ul className="shipping__items">
                {cartItems.map((item: CartItemType) => {
                  return <ShippingItem key={item._id} item={item} />;
                })}
              </ul>
              {cartItems.length > 0 && (
                <Link to="#" onClick={() => setIsCartOpen(true)}>
                  edit
                </Link>
              )}
            </div>
          </div>
          <div className="summary__data">
            <div className="summary__data-card">
              <h4 className="card__title">order summary</h4>
              <ul className="summary__items">
                <li className="summary__item">
                  <p>items</p>
                  <span>{formatCurrency(itemsPrice)}</span>
                </li>
                <li className="summary__item">
                  <p>shipping</p>
                  <span>{formatCurrency(shippingPrice)}</span>
                </li>
                <li className="summary__item">
                  <p>tax</p>
                  <span>{formatCurrency(taxPrice)}</span>
                </li>
                <li className="summary__item">
                  <p>total</p>
                  <span>{formatCurrency(totalPrice)}</span>
                </li>
                <Button
                  onClick={handleMakeOrder}
                  type="button"
                  className="button button--mid"
                  disabled={cartItems.length === 0 || isPending}
                >
                  place order
                </Button>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
