import { CategoryType } from "../types";
import { Link } from "react-router-dom";
import { ERoutes } from "../types";
import Button from "./Button";

export default function CategoryCard({ category }: { category: CategoryType }) {
  const coverImage = new URL(
    `../assets/categories/${category.coverImage}`,
    import.meta.url
  ).href;

  return (
    <li className="category__card">
      <article className="category__card-content">
        <div className="content__text">
          <h4 className="card__title">{category.name}</h4>
          <p>{category.description}</p>
          <p>- Origin: {category.origin}</p>
          <p>- Ratio: {category.cbdToThcRatio}</p>
          <p>- Effects: {category.effectsOfUse}</p>
          <p>- Use in {category.periodOfUse}</p>
        </div>
        <Link to={`${ERoutes.category}/${category._id}`}>
          <Button type="button" className="button button--small">
            products
          </Button>
        </Link>
      </article>
      <div className="category__card-image">
        <div>
          <img src={coverImage} alt="category cover image" />
        </div>
      </div>
    </li>
  );
}
