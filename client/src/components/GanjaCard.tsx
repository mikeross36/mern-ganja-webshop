import { useState } from "react";
import { GanjaType } from "../types";
import cannabisLogo from "@/assets/svgs/header-logo.svg";
import { formatCurrency } from "../utils";
import { Link, useNavigate } from "react-router-dom";
import RatingStars from "./stars/RatingStars";
import Button from "./Button";
import {
  useAppSelector,
  useShoppingCartDispatch,
  useAppContext,
} from "../hooks";
import { RootState } from "../shopping-cart-state/store";
import { addItemToCartAction } from "../shopping-cart-state/actions";
import { ShoppingCartActionType } from "../shopping-cart-state/action-types";
import { ERoutes } from "../types";
import { ShoppingCartStateType } from "../shopping-cart-state/reducers";

export default function GanjaCard({ ganja }: { ganja: GanjaType }) {
  const [ganjaRating, setGanjaRating] = useState(ganja.rating);
  const [quantity] = useState<number>(1);
  const { setIsCartOpen } = useAppContext();
  const { cartItems } = useAppSelector(
    (state: RootState) => state.shoppingCart as ShoppingCartStateType
  );
  const ganjaImg = new URL(
    `../assets/ganjas/${ganja.coverImage}`,
    import.meta.url
  ).href;

  const inCart: boolean = cartItems.some((item) => item._id === ganja._id);
  const itemInCart = inCart ? "item in cart ✔️" : null;
  const dispatch = useShoppingCartDispatch();
  const navigate = useNavigate();

  function handleAddItemToCart() {
    if (ganja._id) {
      dispatch(
        addItemToCartAction(
          ganja as GanjaType & { _id: string },
          quantity
        ) as unknown as ShoppingCartActionType
      );
      navigate(ERoutes.home);
      const timer = setTimeout(() => {
        setIsCartOpen(true);
      }, 500);
      return () => {
        clearTimeout(timer);
      };
    }
  }

  return (
    <li>
      <div className="ganja__card-wrapper">
        <article className="ganja__card">
          <div className="ganja__card-front">
            <img
              src={cannabisLogo}
              alt="cannabis logo svg icon"
              width="36"
              style={{ paddingBottom: "5px" }}
            />
            <h4>{ganja.name}</h4>
            <p>category: {ganja.category}</p>
            <p>thc: {ganja.thc}%</p>
            <p>
              price:{" "}
              <span>{ganja.price ? formatCurrency(ganja.price) : "N/A"}</span>{" "}
            </p>
            <span className="in-cart">{itemInCart}</span>
          </div>
          <div className="ganja__card-right">
            <p>{ganja.name}</p>
            <p>category: {ganja.category}</p>
            <p>thc: {ganja.thc}%</p>
            <h5 style={{ paddingBottom: "5px" }}>
              price:{" "}
              <span>{ganja.price ? formatCurrency(ganja.price) : "N/A"}</span>
            </h5>
            <RatingStars
              maxRating={5}
              color=""
              size={24}
              defaultRating={ganjaRating}
              setUserRating={setGanjaRating}
            />
            <div className="ganja__card-buttons">
              <Link to={`/ganjas/${ganja._id}`}>
                <Button type="button" className="button button--small">
                  details
                </Button>
              </Link>
              <Button
                onClick={handleAddItemToCart}
                type="button"
                className="button button--small"
              >
                add to cart
              </Button>
            </div>
          </div>
        </article>
        <div className="ganja__card-image">
          <img src={ganjaImg} alt="ganja cover imnage" className="ganja__img" />
        </div>
      </div>
    </li>
  );
}
