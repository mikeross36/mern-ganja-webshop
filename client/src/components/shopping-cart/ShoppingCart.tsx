import { useEffect } from "react";
import Button from "../Button";
import { FaWindowClose } from "react-icons/fa";
import {
  useAppContext,
  useAppSelector,
  useAuthContext,
  useShoppingCartDispatch,
} from "../../hooks";
import { RootState } from "../../shopping-cart-state/store";
import { ERoutes } from "../../types";
import CartItem from "./CartItem";
import { Link, useNavigate } from "react-router-dom";
import { removePersistedData } from "../../shopping-cart-state/store";
import { formatCurrency } from "../../utils";
import {
  getTotalsAction,
  clearShoppingCartAction,
} from "../../shopping-cart-state/actions";
import { ShoppingCartActionType } from "../../shopping-cart-state/action-types";
import { ShoppingCartStateType } from "../../shopping-cart-state/reducers";

export default function ShoppingCart(): JSX.Element {
  const { isCartOpen, setIsCartOpen } = useAppContext();
  const { cartItems, cartTotal } = useAppSelector(
    (state: RootState) => state.shoppingCart as ShoppingCartStateType
  );
  const authContext = useAuthContext();
  const loggedInUser = authContext?.state.authUser;
  const dispatch = useShoppingCartDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTotalsAction() as unknown as ShoppingCartActionType);
  }, [cartItems, dispatch]);

  function handleCheckout() {
    navigate(ERoutes.shipping);
    setIsCartOpen(false);
  }

  function handleClearShoppingCart() {
    const confirmed = window.confirm("Are you sure you want to clear cart?");
    if (confirmed) {
      dispatch(clearShoppingCartAction() as unknown as ShoppingCartActionType);
      removePersistedData();
    }
  }

  return (
    <section className="shopping__cart">
      <div className={`sidebar__overlay ${isCartOpen ? "expand" : "shrink"}`}>
        <Button type="button" className="close__cart">
          <FaWindowClose
            size={35}
            color="#fc9403"
            onClick={() => setIsCartOpen(false)}
          />
        </Button>
        {cartItems?.length === 0 ? (
          <aside className="sidebar__empty">
            <h1 className="sidebar__title">cart is empty</h1>
          </aside>
        ) : (
          <aside className="sidebar">
            <h3 className="sidebar__title">your cart</h3>
            <ul>
              {cartItems?.length > 0 &&
                cartItems.map((item) => {
                  return <CartItem key={item._id} item={item} />;
                })}
            </ul>
            <div className="sidebar__footer">
              {cartItems?.length !== 0 && (
                <>
                  <div className="cart__total">
                    {!loggedInUser ? (
                      <Link
                        to={ERoutes.authpage}
                        onClick={() => setIsCartOpen(false)}
                      >
                        <Button type="button" className="button button--small">
                          login to purchase
                        </Button>
                      </Link>
                    ) : (
                      <Button
                        onClick={handleCheckout}
                        type="button"
                        className="button button--small"
                      >
                        Checkout
                      </Button>
                    )}
                    <h4>Total: {formatCurrency(cartTotal)}</h4>
                  </div>
                  <Button
                    type="button"
                    className="button button--small button--clear"
                    onClick={handleClearShoppingCart}
                  >
                    clear cart
                  </Button>
                </>
              )}
            </div>
          </aside>
        )}
      </div>
    </section>
  );
}
