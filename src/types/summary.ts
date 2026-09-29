import type { Product } from "./product";

export interface BusinessSummary {
  revenue: number;
  expenses: number;
  net_flow: number;
  sales_count: number;
  stock_value: number;
  gross_margin: number;
  remaining_debts: number;
  low_stock_products: Product[];
}