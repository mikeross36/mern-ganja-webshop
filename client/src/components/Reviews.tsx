import { useGetAllReviews } from "../features/reviews";
import { ReviewType } from "../types";
import Loader from "./Loader";
import Review from "./Review";

export default function Reviews({ ganjaId }: { ganjaId: string }) {
  const { data: reviews, isPending } = useGetAllReviews();
  // console.log(reviews);

  const ganjaReviews = reviews?.filter(
    (review) => review.ganja._id === ganjaId
  );

  if (isPending) {
    return <Loader />;
  }

  return (
    <section className="reviews">
      {ganjaReviews?.length === 0 ? (
        <h4 className="reviews__title">still no reviews</h4>
      ) : (
        <h4 className="reviews__title">users reviews</h4>
      )}
      <ul className="reviews__list">
        {ganjaReviews?.map((review: ReviewType) => {
          return <Review key={review._id} review={review} />;
        })}
      </ul>
    </section>
  );
}
