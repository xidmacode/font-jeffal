export interface User {
  id: number;
  phone: string;
  name?: string | null;
  email?: string | null;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface UserCreate {
  phone: string;
  password: string;
  name?: string;
  email?: string;
}

export interface UserUpdate {
  phone?: string;
  password?: string;
  name?: string;
  email?: string;
}