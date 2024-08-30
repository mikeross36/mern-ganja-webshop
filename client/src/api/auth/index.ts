import { apiClient } from "../apiClient";
import { ILoginResponse, IGenericResponse, IUserResponse } from "../../types";

export async function refreshAccessToken() {
  return (await apiClient.get<ILoginResponse>("auth/refresh")).data;
}

export async function registerUser(
  userName: string,
  email: string,
  password: string,
  confirmPassword: string
) {
  return (
    await apiClient.post<IGenericResponse>("auth/register", {
      userName,
      email,
      password,
      confirmPassword,
    })
  ).data;
}

export async function loginUser(email: string, password: string) {
  return (
    await apiClient.post<ILoginResponse>("auth/login", {
      email,
      password,
    })
  ).data;
}

export async function verifyEmail(userId: string, verificationCode: string) {
  return (
    await apiClient.post<IGenericResponse>(
      `auth/verify/${userId}/${verificationCode}`
    )
  ).data;
}

export async function logoutUser() {
  return (await apiClient.post<IGenericResponse>("auth/logout")).data;
}

export async function getLoggedInUserInfo() {
  return (await apiClient.get<IUserResponse>("users/loggedin-info")).data;
}

export async function forgotPassword(email: string) {
  return (
    await apiClient.post<IGenericResponse>("auth/forgot-password", { email })
  ).data;
}

export async function resetPassword(
  resetToken: string,
  password: string,
  confirmPassword: string
) {
  return (
    await apiClient.patch(`auth/reset-password/${resetToken}`, {
      password,
      confirmPassword,
    })
  ).data;
}

export async function updatePassword(
  currentPassword: string,
  password: string,
  confirmPassword: string
) {
  return (
    await apiClient.patch<IGenericResponse>("auth/update-password", {
      currentPassword,
      password,
      confirmPassword,
    })
  ).data;
}
