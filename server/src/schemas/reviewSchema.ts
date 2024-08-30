import { object, string, number, instanceof as instanceof_, TypeOf } from "zod";
import { ObjectId } from "mongodb";

export const createReviewSchema = object({
  body: object({
    content: string({ required_error: "Review content is required" }).max(
      260,
      "Review content cannot be longer then 260 chars"
    ),
  }),
});

export const updateReviewSchema = object({
  params: object({
    reviewId: string(),
  }),
  body: object({
    content: string({ required_error: "Review content is required" }).max(
      260,
      "Review content cannot be longer then 260 chars"
    ),
  }),
});

export const findReview = object({
  params: object({
    reviewId: string(),
  }),
});

export const deleteReviewSchema = object({
  params: object({
    reviewId: string(),
  }),
});

export type CreateReviewInput = TypeOf<typeof createReviewSchema>["body"];
export type UpdateReviewInput = TypeOf<typeof updateReviewSchema>["params"];
export type DeleteReviewInput = TypeOf<typeof deleteReviewSchema>["params"];
