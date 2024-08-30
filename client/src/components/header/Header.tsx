import headerLogo from "@/assets/svgs/header-logo.svg";
import { GiShoppingCart } from "react-icons/gi";
import { FaAlignRight } from "react-icons/fa";
import { useAppContext, useAppSelector } from "../../hooks";
import { RootState } from "../../shopping-cart-state/store";
import NavMenu from "./NavMenu";

export default function Header() {
  const { setShowMobMenu, setIsCartOpen } = useAppContext();
  const { itemsTotal } = useAppSelector(
    (state: RootState) => state.shoppingCart
  );
  // console.log(shoppingCart);

  function toggleMobMenu() {
    setShowMobMenu((prev) => !prev);
  }

  return (
    <header className="header">
      <div className="image__content">
        <nav className="nav">
          <div className="nav__logo">
            <p>GanjaWebshop</p>
            <div className="nav__logo-images">
              <img src={headerLogo} alt="header logo svg icon" />
              <div
                className="shopping__icon"
                onClick={() => setIsCartOpen(true)}
              >
                <GiShoppingCart size={40} className="cart__icon" />
              </div>
              <span className="cart__items-total">{itemsTotal}</span>
            </div>
          </div>
          <NavMenu />
          <button onClick={toggleMobMenu} className="nav__toggle" type="button">
            <FaAlignRight size={40} className="nav__toggle-btn" />
          </button>
        </nav>
      </div>
    </header>
  );
}
