import { Link } from "react-router-dom";
import headerLogo from "@/assets/svgs/header-logo.svg";
import { ERoutes } from "../../types";
import UpdateAccount from "./UpdateAccount";
import UpdatePassword from "./UpdatePassword";

export default function UserAccount() {
  return (
    <>
      <div className="nav__logo-page">
        <Link to={ERoutes.home}>
          <p>GanjaWebshop</p>
        </Link>
        <img src={headerLogo} alt="header logo svg icon" />
      </div>
      <section className="user__acoount section">
        <h2 className="section__title">
          <span>your account</span>
        </h2>
        <div className="user__account-content">
          <UpdateAccount />
          <UpdatePassword />
        </div>
      </section>
    </>
  );
}
