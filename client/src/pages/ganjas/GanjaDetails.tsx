import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ERoutes, GanjaType } from "../../types";
import { useGetGanja } from "../../features/ganjas";
import Loader from "../../components/Loader";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import thcSymbol from "@/assets/thc-symbol.jpg";
import { formatDate } from "date-fns";
import RatingStars from "../../components/stars/RatingStars";
import Button from "../../components/Button";
import {
  useAuthContext,
  useShoppingCartDispatch,
  useAppContext,
} from "../../hooks";
import { addItemToCartAction } from "../../shopping-cart-state/actions";
import { ShoppingCartActionType } from "../../shopping-cart-state/action-types";
import AddReview from "../../components/AddReview";
import Reviews from "../../components/Reviews";

export default function GanjaDetails() {
  const { id } = useParams();
  const { data: ganja, status, error } = useGetGanja(id!);

  const [ganjaRating, setGanjaRating] = useState(ganja?.rating);
  const [quantity] = useState<number>(1);

  const authContext = useAuthContext();
  const loggedInUser = authContext?.state.authUser;
    const { setIsCartOpen } = useAppContext();
  
  const coverImage = ganja?.coverImage
    ? new URL(`../../assets/ganjas/${ganja.coverImage}`, import.meta.url).href
    : "";

  const dispatch = useShoppingCartDispatch();
  const navigate = useNavigate();

  function handleAddItemToCart() {
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

  if (status === "pending") {
    return <Loader />;
  } else if (error && error instanceof AxiosError) {
    toast.error(error.message);
  }

  if (!ganja) {
    return null;
  }
  return (
    <section className="ganja section container">
      <header className="ganja__header">
        <Link to={ERoutes.home}>
          <h3 className="ganja__name">{ganja.name}</h3>
        </Link>
      </header>
      <div className="ganja__image">
        <img src={coverImage} alt="ganja details cover image" />
      </div>
      <article className="ganja__details">
        <img src={thcSymbol} alt="thc symbol icon" />
        <p>category: {ganja.category}</p>
        <p>tested: {formatDate(ganja.dataTested, "yyyy.MM.dd")}</p>
        <p>thca: {ganja.thca}%</p>
        <p>thc: {ganja.thc}%</p>
        <p>cbda: {ganja.cbda}%</p>
        <p>cbd: {ganja.cbd}%</p>
        <div className="ganja__rating">
          <p>rating:</p>
          <RatingStars
            maxRating={5}
            color=""
            size={24}
            defaultRating={ganjaRating}
            setUserRating={setGanjaRating}
          />
        </div>
        <p className="ganja__summary">
          <em>{ganja.summary}</em>
        </p>
        <div className="ganja__details-btns">
          <Button
            onClick={handleAddItemToCart}
            type="button"
            className="button button--mid"
          >
            add to cart
          </Button>
          {!loggedInUser ? (
            <div className="product__login">
              <Link to={ERoutes.authpage}>
                <Button type="button" className="button button--mid">
                  login to add review
                </Button>
              </Link>
            </div>
          ) : (
            <AddReview ganjaId={ganja._id ?? ""} />
          )}
        </div>
      </article>
      <Reviews ganjaId={ganja._id ?? ""} />
    </section>
  );
}
