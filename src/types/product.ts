export interface Product {
  id: number;
  name: string;
  category: string | null;
  unit: string;
  purchase_price: number;
  selling_price: number;
  stock_quantity: number;
}

export interface ProductCreate {
  name: string;
  category?: string | null;
  unit: string;
  purchase_price: number;
  selling_price: number;
  stock_quantity: number;
}

export interface ProductUpdate {
  name?: string;
  category?: string | null;
  unit?: string;
  purchase_price?: number;
  selling_price?: number;
  stock_quantity?: number;
}