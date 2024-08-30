import { useState } from "react";
import { useAddReview } from "../features/reviews";
import Button from "./Button";
import Loader from "./Loader";

export default function AddReview({ ganjaId }: { ganjaId: string }) {
  const [content, setContent] = useState<string>("");

  const { mutate: addReview, isPending } = useAddReview();

  function handleAddReview(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    addReview({ id: ganjaId, content }, { onSettled: () => setContent("") });
  }

  if (isPending) {
    return <Loader />;
  }

  return (
    <section className="add__review">
      <div className="review__form-bcg">
        <form className="review__form" onSubmit={handleAddReview}>
          <div className="form__control">
            <label htmlFor="review-content" className="form__label">
              add review
            </label>
            <textarea
              name=""
              id="review-content"
              className="form__input"
              cols={4}
              rows={5}
              maxLength={300}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="button button--mid">
            save
          </Button>
        </form>
      </div>
    </section>
  );
}
