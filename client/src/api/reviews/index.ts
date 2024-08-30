import { IGenericResponse, IReviewResponse } from "../../types";
import { apiClient } from "../apiClient";

export async function addReview(id: string, content: string) {
  return (
    await apiClient.post<IGenericResponse>(`ganjas/${id}/reviews`, { content })
  ).data;
}

export async function getAllReviews() {
  return (await apiClient.get<IReviewResponse>("reviews")).data;
}
