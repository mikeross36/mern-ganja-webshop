import { ReviewType } from "../types";

export default function Review({ review }: { review: ReviewType }) {
  const photoPreview = new URL("../assets/users/default.jpg", import.meta.url)
    .href;
  const usersPhoto = new URL(
    `../assets/users/${review.user.photo}`,
    import.meta.url
  ).href;

  return (
    <li className="review__card">
      <figure className="review__awatar">
        {review.user && !review.user.photo ? (
          <img
            src={photoPreview}
            alt="review's author photo"
            className="review__avatar-img"
          />
        ) : (
          <img
            src={usersPhoto}
            alt="review's author photo"
            className="review__avatar-img"
          />
        )}
      </figure>
      <p className="review__content">{review.content}</p>
    </li>
  );
}
