import { useState } from "react";
import Star from "./Star";

export type RatingPropsType = {
  maxRating: number;
  color: string;
  size: number;
  defaultRating: number | undefined;
  setUserRating: React.Dispatch<React.SetStateAction<number | undefined>>;
};

export default function RatingStars({
  maxRating = 5,
  color = "#fc9403",
  size = 40,
  defaultRating,
  setUserRating,
}: RatingPropsType) {
  const [rating, setRating] = useState<number | undefined>(defaultRating);
  const [hoverRating, setHoverRating] = useState<number>(0);

  function handleRating(rate: number) {
    setRating(rate);
    setUserRating(rate);
  }
  return (
    <div className="rating__stars">
      <div className="rating__stars-container">
        {[...Array(maxRating).keys()].map((_, idx) => {
          return (
            <Star
              key={idx}
              onClickRate={() => handleRating(idx + 1)}
              fullStar={
                hoverRating ? hoverRating >= idx + 1 : rating! >= idx + 1
              }
              onHoverIn={() => setHoverRating(idx + 1)}
              onHoverOut={() => setHoverRating(0)}
              color={color}
              size={size}
            />
          );
        })}
      </div>
    </div>
  );
}
