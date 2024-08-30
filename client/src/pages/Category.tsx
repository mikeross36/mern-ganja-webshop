import headerLogo from "@/assets/svgs/header-logo.svg";
import { Link, useParams } from "react-router-dom";
import { ERoutes } from "../types";
import { useGetCategory } from "../features/categories";
import Loader from "../components/Loader";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import GanjaCard from "../components/GanjaCard";

export default function Category() {
  const { id } = useParams();
  const { data, status, error } = useGetCategory(id!);
  // console.log(data);

  return (
    <section className="category__products section">
      <div className="nav__logo">
        <Link to={ERoutes.home}>
          <h4>GanjaWebshop</h4>
        </Link>
        <img src={headerLogo} alt="header logo svg icon" />
      </div>
      <h2 className="section__title">
        <span>products by category</span>
      </h2>
      {status === "pending" ? (
        <Loader />
      ) : error instanceof AxiosError ? (
        toast.error(error.message)
      ) : (
        data && (
          <ul className="category__products-container container">
            {data.length > 0 &&
              data.map((ganja) => {
                return <GanjaCard key={ganja._id} ganja={ganja} />;
              })}
          </ul>
        )
      )}
    </section>
  );
}
