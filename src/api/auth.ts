import {
  apiFetch,
  setToken,
} from "./client";

import type {
  LoginResponse,
  User,
  UserCreate,
  UserUpdate,
} from "../types/auth";

export async function login(
  phone: string,
  password: string
): Promise<LoginResponse> {
  const formData = new URLSearchParams();

  formData.set("username", phone);
  formData.set("password", password);

  const response = await apiFetch<LoginResponse>(
    "/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    }
  );

  setToken(response.access_token);

  return response;
}

export function getMe(): Promise<User> {
  return apiFetch<User>("/auth/me");
}

export function createUser(
  data: UserCreate
): Promise<User> {
  return apiFetch<User>("/users/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateUser(
  userId: number,
  data: UserUpdate
): Promise<User> {
  return apiFetch<User>(
    `/users/${userId}`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
    }
  );
}

export function deleteUser(
  userId: number
): Promise<void> {
  return apiFetch<void>(
    `/users/${userId}`,
    {
      method: "DELETE",
    }
  );
}