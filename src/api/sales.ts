import { apiFetch } from "./client";

import type {
  Sale,
  SaleCreate,
} from "../types/sale";

function salesUrl(
  businessId: number
): string {
  return `/businesses/${businessId}/sales`;
}

export function getSales(
  businessId: number
): Promise<Sale[]> {
  return apiFetch<Sale[]>(
    `${salesUrl(businessId)}/`
  );
}

export function createSale(
  businessId: number,
  data: SaleCreate
): Promise<Sale> {
  return apiFetch<Sale>(
    `${salesUrl(businessId)}/`,
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
}