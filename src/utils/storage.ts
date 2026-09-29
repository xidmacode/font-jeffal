const TOKEN_KEY =
  "jeffal_token";

const USER_KEY =
  "jeffal_user";

const BUSINESS_KEY =
  "jeffal_business";

export function getToken():
  | string
  | null {
  return localStorage.getItem(
    TOKEN_KEY
  );
}

export function setToken(
  token: string
): void {
  localStorage.setItem(
    TOKEN_KEY,
    token
  );
}

export function removeToken(): void {
  localStorage.removeItem(
    TOKEN_KEY
  );
}

export function getStoredUser<T>():
  | T
  | null {
  const value =
    localStorage.getItem(
      USER_KEY
    );

  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

export function setStoredUser<T>(
  user: T
): void {
  localStorage.setItem(
    USER_KEY,
    JSON.stringify(user)
  );
}

export function removeStoredUser(): void {
  localStorage.removeItem(
    USER_KEY
  );
}

export function getStoredBusiness<T>():
  | T
  | null {
  const value =
    localStorage.getItem(
      BUSINESS_KEY
    );

  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

export function setStoredBusiness<T>(
  business: T
): void {
  localStorage.setItem(
    BUSINESS_KEY,
    JSON.stringify(business)
  );
}

export function removeStoredBusiness(): void {
  localStorage.removeItem(
    BUSINESS_KEY
  );
}

export function clearStorage(): void {
  removeToken();
  removeStoredUser();
  removeStoredBusiness();
}