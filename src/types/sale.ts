export interface SaleItem {
  id?: number;
  product_id: number;
  quantity: number;
  product_name?: string;
  unit_price?: number;
  total?: number;
}

export interface Sale {
  id: number;
  business_id?: number;
  date?: string;
  created_at?: string;
  amount?: number;
  total_amount?: number;
  payment_method: string;
  items: SaleItem[];
}

export interface SaleCreate {
  payment_method: string;
  items: SaleItemCreate[];
}

export interface SaleItemCreate {
  product_id: number;
  quantity: number;
}