import { FaTimesCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ERoutes } from "../../types";
import { useAppContext, useAuthContext } from "../../hooks";
import MenuLink from "./MenuLink";
import DropDownMenu from "./DropdownMenu";

export default function NavMenu() {
  const { showMobMenu, setShowMobMenu } = useAppContext();
  const authContext = useAuthContext();
  const loggedInUser = authContext?.state.authUser;
  // console.log(loggedInUser);

  return (
    <div
      onClick={() => setShowMobMenu(false)}
      className={`nav__menu ${showMobMenu && "show-menu"}`}
    >
      <ul className="nav__list">
        <div className="nav__close">
          <FaTimesCircle size={30} color="#fff" />
        </div>
        <li className="nav__item">
          <MenuLink page="home" />
        </li>
        <li className="nav__item">
          <MenuLink page="about" />
        </li>
        <li className="nav__item">
          <MenuLink page="ganjas" />
        </li>
        <li className="nav__item">
          <MenuLink page="categories" />
        </li>
        <li className="nav__item">
          <MenuLink page="contact" />
        </li>
        {loggedInUser === null ? (
          <li className="nav__item">
            <Link to={ERoutes.authpage} className="nav__link">
              login
            </Link>
          </li>
        ) : (
          <li className="nav__item" onClick={(e) => e.stopPropagation()}>
            <DropDownMenu />
          </li>
        )}
      </ul>
    </div>
  );
}
