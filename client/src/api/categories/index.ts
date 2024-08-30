import { apiClient } from "../apiClient";
import { CategoryType, ICategoryResponse } from "../../types";

export async function getAllCategories() {
  return (await apiClient.get<ICategoryResponse>("categories")).data;
}

export async function getCategory(id: string) {
  return (await apiClient.get<CategoryType>(`categories/${id}`)).data;
}
