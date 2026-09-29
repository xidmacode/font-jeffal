```ts
import { apiFetch } from "./client";

import type {
  Debt,
  DebtCreate,
  DebtPayment,
  DebtPaymentCreate,
} from "../types/debt";

function debtsUrl(businessId: number): string {
  return `/businesses/${businessId}/debts`;
}

/**
 * Récupérer toutes les dettes d'une entreprise
 */
export function getDebts(
  businessId: number
): Promise<Debt[]> {
  return apiFetch<Debt[]>(
    `${debtsUrl(businessId)}/`
  );
}

/**
 * Récupérer une dette précise
 */
export function getDebt(
  businessId: number,
  debtId: number
): Promise<Debt> {
  return apiFetch<Debt>(
    `${debtsUrl(businessId)}/${debtId}/`
  );
}

/**
 * Créer une nouvelle dette
 */
export function createDebt(
  businessId: number,
  data: DebtCreate
): Promise<Debt> {
  return apiFetch<Debt>(
    `${debtsUrl(businessId)}/`,
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
}

/**
 * Ajouter un paiement à une dette
 */
export function addDebtPayment(
  businessId: number,
  debtId: number,
  data: DebtPaymentCreate
): Promise<DebtPayment> {
  return apiFetch<DebtPayment>(
    `${debtsUrl(businessId)}/${debtId}/payments/`,
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
}

