import { apiClient } from "../apiClient";

export async function updateUserAccount(userName: string, email: string) {
  return (
    await apiClient.put("users/update-user-account", {
      userName,
      email,
    })
  ).data;
}
