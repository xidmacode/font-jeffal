import { apiFetch } from "./client";

import type {
  BusinessSummary,
} from "../types/summary";

export function getSummary(
  businessId: number
): Promise<BusinessSummary> {
  return apiFetch<BusinessSummary>(
    `/businesses/${businessId}/summary/`
  );
}