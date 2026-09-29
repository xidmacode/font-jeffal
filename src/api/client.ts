const API_URL = (
  import.meta.env.VITE_API_URL ||
  "http://localhost:8000"
).replace(/\/$/, "");

export class ApiError extends Error {
  status: number;
  detail: unknown;

  constructor(
    message: string,
    status: number,
    detail?: unknown
  ) {
    super(message);

    this.name = "ApiError";
    this.status = status;
    this.detail = detail;
  }
}

function getToken(): string | null {
  return localStorage.getItem(
    "jeffal_access_token"
  );
}

export function setToken(
  token: string
): void {
  localStorage.setItem(
    "jeffal_access_token",
    token
  );
}

export function clearToken(): void {
  localStorage.removeItem(
    "jeffal_access_token"
  );
}

async function parseResponse(
  response: Response
): Promise<unknown> {
  const contentType =
    response.headers.get(
      "content-type"
    ) || "";

  if (
    contentType.includes(
      "application/json"
    )
  ) {
    return response.json();
  }

  return response.text();
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();

  const headers = new Headers(
    options.headers
  );

  if (
    !(options.body instanceof FormData)
  ) {
    headers.set(
      "Content-Type",
      "application/json"
    );
  }

  headers.set(
    "Accept",
    "application/json"
  );

  if (token) {
    headers.set(
      "Authorization",
      `Bearer ${token}`
    );
  }

  const response = await fetch(
    `${API_URL}${path}`,
    {
      ...options,
      headers,
    }
  );

  const data =
    await parseResponse(response);

  if (!response.ok) {
    let message =
      `Erreur HTTP ${response.status}`;

    if (
      typeof data === "object" &&
      data !== null &&
      "detail" in data
    ) {
      const detail = (
        data as {
          detail: unknown;
        }
      ).detail;

      if (
        typeof detail === "string"
      ) {
        message = detail;
      } else {
        message =
          JSON.stringify(detail); 
      }
    }

    if (response.status === 401) {
      clearToken();
    }

    throw new ApiError(
      message,
      response.status,
      data
    );
  }

  return data as T;
}

export {
  API_URL,
};