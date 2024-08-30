import { useState, useEffect } from "react";
import { useAppSelector, useShoppingCartDispatch } from "../hooks";
import { Link, useNavigate } from "react-router-dom";
import { savePaymentMethodAction } from "../shopping-cart-state/actions";
import Checkout from "../components/Checkout";
import headerLogo from "@/assets/svgs/header-logo.svg";
import Input from "../components/Input";
import Button from "../components/Button";
import { ERoutes } from "../types";
import { ShoppingCartActionType } from "../shopping-cart-state/action-types";
import { ShoppingCartStateType } from "../shopping-cart-state/reducers";

export default function PaymentPage() {
  const { shippingAddress, paymentMethod } = useAppSelector(
    (state) => state.shoppingCart as ShoppingCartStateType
  );
  const [paymentMethodName, setPaymentMethodName] = useState(
    paymentMethod || "Paypal"
  );

  const navigate = useNavigate();
  const dispatch = useShoppingCartDispatch();

  useEffect(() => {
    if (!shippingAddress.address) navigate(ERoutes.shipping);
  }, [shippingAddress, navigate]);

  function handleFormSubmit(e: React.MouseEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(
      savePaymentMethodAction(
        paymentMethodName
      ) as unknown as ShoppingCartActionType
    );
    navigate(ERoutes.makeorder);
  }

  return (
    <>
      <div className="nav__logo-page">
        <Link to={ERoutes.home}>
          <p>GanjaWebshop</p>
        </Link>
        <img src={headerLogo} alt="header logo svg icon" />
      </div>
      <Checkout step1 step2 step3 />
      <section className="payment container">
        <h2 className="section__title">
          <span>payment</span>
        </h2>
        <div className="payment__title">
          <img src={headerLogo} alt="header logo icon" width={32} />
          <h3>payment method</h3>
        </div>
        <form className="payment__form" onSubmit={handleFormSubmit}>
          <div className="form__control">
            <Input
              type="radio"
              name="PayPal"
              id="PayPal"
              value={paymentMethod || "Paypal"}
              onChange={setPaymentMethodName}
            />
            <label htmlFor="PayPal">PayPal</label>
          </div>
          <div className="form__control">
            <Input
              type="radio"
              name="Stripe"
              id="Stripe"
              value={paymentMethod || "Stripe"}
              onChange={setPaymentMethodName}
            />
            <label htmlFor="Stripe">Stripe</label>
          </div>
          <Button type="submit" className="button button--mid">
            continue
          </Button>
        </form>
      </section>
    </>
  );
}
