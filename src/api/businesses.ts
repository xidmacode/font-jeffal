import { apiFetch } from "./client";

import type {
  Business,
  BusinessCreate,
  BusinessUpdate,
} from "../types/business";

export function getBusinesses(): Promise<Business[]> {
  return apiFetch<Business[]>(
    "/businesses/"
  );
}

export function getBusiness(
  businessId: number
): Promise<Business> {
  return apiFetch<Business>(
    `/businesses/${businessId}`
  );
}

export function createBusiness(
  data: BusinessCreate
): Promise<Business> {
  return apiFetch<Business>(
    "/businesses/",
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
}

export function updateBusiness(
  businessId: number,
  data: BusinessUpdate
): Promise<Business> {
  return apiFetch<Business>(
    `/businesses/${businessId}`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
    }
  );
}

export function deleteBusiness(
  businessId: number
): Promise<void> {
  return apiFetch<void>(
    `/businesses/${businessId}`,
    {
      method: "DELETE",
    }
  );
}