import { apiClient } from "../apiClient";
import { IGanjasResponse } from "../../types";

export async function getAllGanjas() {
  return (await apiClient.get<IGanjasResponse>("ganjas")).data;
}

export async function getGanja(id: string) {
  return (await apiClient.get<IGanjasResponse>(`ganjas/${id}`)).data;
}
