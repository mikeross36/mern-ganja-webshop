import { motion } from "framer-motion";
import { useAppContext } from "../hooks";
import { CategoryType, ESelectedPage } from "../types";
import { useGetAllCategories } from "../features/categories";
import Loader from "../components/Loader";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import CategoryCard from "../components/CategoryCard";

export default function Categories() {
  const { setSelectedPage } = useAppContext();
  const { data, status, error } = useGetAllCategories();

  return (
    <motion.section
      onViewportEnter={() => setSelectedPage(ESelectedPage.categories)}
      className="categories section container"
      id="categories"
    >
      <h2 className="section__title">
        <span>choose by categories</span>
      </h2>
      {status === "pending" ? (
        <Loader />
      ) : error instanceof AxiosError ? (
        toast.error(error.message)
      ) : (
        <ul className="categories__wrapper">
          {data &&
            data.length > 0 &&
            data.map((category: CategoryType) => {
              return <CategoryCard key={category._id} category={category} />;
            })}
        </ul>
      )}
    </motion.section>
  );
}
