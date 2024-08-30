import { useState, useRef } from "react";
import { FaAngleDoubleUp } from "react-icons/fa";
import {
  FaUserGear,
  FaCartShopping,
  FaArrowRightToBracket,
} from "react-icons/fa6";
import { useAppContext, useOutsideClick, useAuthContext } from "../../hooks";
import { Link } from "react-router-dom";
import { useLogoutUser } from "../../features/auth";
import { ERoutes } from "../../types";

export default function DropDownMenu() {
  const [showDropdown, setShowDropdown] = useState(false);
  const { setShowMobMenu } = useAppContext();
  const { mutate: logoutAction } = useLogoutUser();
  const authContext = useAuthContext();
  const loggedInUser = authContext?.state.authUser;

  const dropRef = useRef(null);

  let userPhoto;
  if (loggedInUser && loggedInUser.photo) {
    userPhoto = new URL(
      `../../assets/users/${loggedInUser.photo}`,
      import.meta.url
    ).href;
  }
  const photoPreview = new URL(
    "../../assets/users/default.jpg",
    import.meta.url
  ).href;

  function toggleDropdown() {
    setShowDropdown((prev) => !prev);
  }

  function handleLogout() {
    logoutAction();
    localStorage.clear();
    window.location.reload();
  }

  useOutsideClick(dropRef, () => {
    setShowDropdown(false);
  });

  return (
    <main className="dropdown__menu" ref={dropRef}>
      <div
        className={`dropdown__menu-content ${
          showDropdown ? "show-dropdown" : ""
        }`}
      >
        <button onClick={toggleDropdown} className="dropdown__menu-button">
          {loggedInUser ? (
            <img
              src={userPhoto}
              alt="user photo"
              className="dropdown__user-img"
            />
          ) : (
            <img
              src={photoPreview}
              alt="default user photo"
              className="dropdown__user-img"
            />
          )}
          <span className="dropdown__menu-user">
            <p>{loggedInUser?.userName?.split(" ")[0]}</p>
          </span>
          <div className="dropdown__menu-icons">
            <FaAngleDoubleUp className="dropdown__arrow" />
          </div>
        </button>
        <ul
          onClick={() => {
            setShowMobMenu(false);
            setShowDropdown(false);
          }}
          className="dropdown__list"
        >
          <li>
            <Link to={ERoutes.useraccount} className="dropdown__item">
              <FaUserGear className="dropdown__icon" />
              <span className="dropdown__title">my account</span>
            </Link>
          </li>
          <li>
            <Link to={ERoutes.userorders} className="dropdown__item">
              <FaCartShopping className="dropdown__icon" />
              <span className="dropdown__title">my orders</span>
            </Link>
          </li>
          <li onClick={handleLogout} className="dropdown__item">
            <FaArrowRightToBracket className="dropdown__icon" />
            <span className="dropdown__title">logout</span>
          </li>
        </ul>
      </div>
    </main>
  );
}
