export interface Business {
  id: number;
  name: string;
  description?: string | null;
  phone?: string | null;
  address?: string | null;
}

export interface BusinessCreate {
  name: string;
  description?: string;
  phone?: string;
  address?: string;
}

export interface BusinessUpdate {
  name?: string;
  description?: string;
  phone?: string;
  address?: string;
}