export type DebtStatus =
  | "À payer"
  | "Partiellement payé"
  | "Payé";

export interface Debt {
  id: number;
  business_id?: number;
  customer_name: string;
  initial_amount: number;
  paid_amount: number;
  remaining_amount: number;
  status: DebtStatus;
  created_at?: string;
}

export interface DebtCreate {
  customer_name: string;
  initial_amount: number;
}

export interface DebtPayment {
  id: number;
  debt_id: number;
  amount: number;
  created_at?: string;
}

export interface DebtPaymentCreate {
  amount: number;
}