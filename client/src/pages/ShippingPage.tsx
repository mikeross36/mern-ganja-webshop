import { useState } from "react";
import { useAppSelector, useShoppingCartDispatch } from "../hooks";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../shopping-cart-state/store";
import { ShoppingCartStateType } from "../shopping-cart-state/reducers";
import { saveShippingAddressAction } from "../shopping-cart-state/actions";
import Button from "../components/Button";
import Checkout from "../components/Checkout";
import headerLogo from "@/assets/svgs/header-logo.svg";
import Input from "../components/Input";
import { ShoppingCartActionType } from "../shopping-cart-state/action-types";
import { ERoutes } from "../types";

export default function ShippingPage() {
  const { shippingAddress } = useAppSelector(
    (state: RootState) => state.shoppingCart as ShoppingCartStateType
  );
  const [fullName, setFullName] = useState(shippingAddress?.fullName ?? "");
  const [address, setAddress] = useState(shippingAddress?.address ?? "");
  const [city, setCity] = useState(shippingAddress?.city ?? "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode ?? ""
  );
  const [country, setCountry] = useState(shippingAddress?.country ?? "");

  const navigate = useNavigate();
  const dispatch = useShoppingCartDispatch();

  function handleSubmitForm(e: React.MouseEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(
      saveShippingAddressAction({
        fullName,
        address,
        city,
        postalCode,
        country,
      }) as unknown as ShoppingCartActionType
    );
    navigate(ERoutes.payment);
  }

  return (
    <>
      <div className="nav__logo-page">
        <Link to={ERoutes.home}>
          <p>GanjaWebshop</p>
        </Link>
        <img src={headerLogo} alt="header logo svg icon" />
      </div>
      <Checkout step1 step2 />
      <section className="shipping container">
        <h2 className="section__title">
          <span>shipping</span>
        </h2>
        <div className="shipping__title">
          <img src={headerLogo} alt="header logo icon" width={32} />
          <h3>shipping address</h3>
        </div>
        <form className="shipping__form" onSubmit={handleSubmitForm}>
          <div className="form__control">
            <Input
              type="text"
              name="full-name"
              autoComplete="off"
              placeHolder="full name..."
              value={fullName}
              onChange={setFullName}
              required
            />
          </div>
          <div className="form__control">
            <Input
              type="text"
              name="addrress"
              autoComplete="off"
              placeHolder="address..."
              value={address}
              onChange={setAddress}
              required
            />
          </div>
          <div className="form__control">
            <Input
              type="text"
              name="city"
              autoComplete="off"
              placeHolder="city..."
              value={city}
              onChange={setCity}
              required
            />
          </div>
          <div className="form__control">
            <Input
              type="text"
              name="postal-code"
              autoComplete="off"
              placeHolder="postal code..."
              value={postalCode}
              onChange={setPostalCode}
              required
            />
          </div>
          <div className="form__control">
            <Input
              type="text"
              name="country"
              autoComplete="off"
              placeHolder="country..."
              value={country}
              onChange={setCountry}
              required
            />
          </div>
          <Button type="submit" className="button button--mid">
            continue
          </Button>
        </form>
      </section>
    </>
  );
}
